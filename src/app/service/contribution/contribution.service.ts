import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ContributionModel } from '../../model/ContributionModel';
import { ContributionTypes } from '../../util/constant';
import { CategoryService } from '../category/category.service';

@Injectable( {
  providedIn: 'root'
} )
export class ContributionService {

  public recommendedContributions: Observable<any>;
  private recommendedContributionsSubject: BehaviorSubject<any>;

  public recommendedContributionsByFollowingList: Observable<any>;
  private recommendedContributionsByFollowingListSubject: BehaviorSubject<any>;

  public attendedContributions: Observable<any>;
  private attendedContributionsSubject: BehaviorSubject<any>;

  public searchedContributions: Observable<any>;
  private searchedContributionsSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {
    this.recommendedContributionsSubject = new BehaviorSubject<any>( null );
    this.recommendedContributions = this.recommendedContributionsSubject.asObservable();

    this.recommendedContributionsByFollowingListSubject = new BehaviorSubject<any>( null );
    this.recommendedContributionsByFollowingList = this.recommendedContributionsByFollowingListSubject.asObservable();

    this.attendedContributionsSubject = new BehaviorSubject<any>( null );
    this.attendedContributions = this.attendedContributionsSubject.asObservable();

    this.searchedContributionsSubject = new BehaviorSubject<any>(null);
    this.searchedContributions = this.searchedContributionsSubject.asObservable();
  }

  create( contribution: any ) {
    return this.http.post<any>( `${ environment.serverUrl }/contribution/me`, contribution );
  }

  update( contribution: any ) {
    return this.http.put<any>( `${ environment.serverUrl }/contribution/me`, contribution );
  }

  countUserContributions( username: string, isPastOnly: string = 'true' ) {
    return this.http.get<any>( `${ environment.serverUrl }/contribution/count?username=${ username }&isPastOnly=${ isPastOnly }` )
    .pipe( map( counts => {
      counts.map( categories => {
        const categoryResult = this.categoryService.getCategoryFromId( categories._id.category,
          categories._id.subCategory, categories._id.leafCategory );

        categories._id = categoryResult
      } );

      const newContributionsList = []
      counts.map( category => {
        const categoryName = category._id.leafCategory ? category._id.leafCategory.name :
          category._id.subCategory ? category._id.subCategory.name : category._id.category.name

        // if there is duplicated category then do not push to array, just add value to the existing category
        let duplicatedNameIndex = -1
        for( let i = 0; i < newContributionsList.length; i++ ) {
          if ( newContributionsList[i].name === categoryName ) {
            duplicatedNameIndex = i
            break
          }
        }
        if  ( duplicatedNameIndex === -1 ) {
          newContributionsList.push( {
            name: categoryName,
            value: category.count
          } )
        } else {
          newContributionsList[duplicatedNameIndex].value += category.count
          newContributionsList.sort( ( x, y ) => x.value > y.value ? -1 : 1)
        }
      } )

      return newContributionsList
    } ) );
  }

  me( isNewOnly: string = 'false', isCompleted: string = 'false', startDate?: string, endDate?:string, title?: string ) {

    let queryParams = `isNewOnly=${ isNewOnly }&isCompleted=${ isCompleted }`

    if ( startDate ) {
      queryParams += `&startDate=${ startDate }`
    }

    if ( endDate ) {
      queryParams += `&endDate=${ endDate }`
    }

    if ( title ) {
      queryParams += `&title=${ title }`
    }

    return this.http.get<any>( `${ environment.serverUrl }/contribution/me?` + queryParams )
    .pipe( map( myContributions => {
      myContributions.map( contribution => {
        const categoryResult = this.categoryService.getCategoryFromId( contribution.payload?.category,
          contribution.payload?.subCategory, contribution.payload?.leafCategory );

        if ( categoryResult.category ) {
          contribution.payload.category = categoryResult.category;
        }

        if ( categoryResult.subCategory ) {
          contribution.payload.subCategory = categoryResult.subCategory;
        }

        if ( categoryResult.leafCategory ) {
          contribution.payload.leafCategory = categoryResult.leafCategory;
        }

        // check if contribution is in progress only for upcomings
        if ( isNewOnly === 'true' ) {
          this.checkInProgress( contribution )
        }

        contribution.date = formatDate( new Date( contribution.date ), 'yyyy/MM/dd HH:mm Z', 'en-US' );
      } );

      return myContributions;
    } ) );
  }

  search( _id, contributor, date, title, categories: any[],
    contributionType: ContributionTypes = ContributionTypes.Other, fill = false,
    excludeCurrentUserContributions = false, limit = 20) {
    return this.http.post<any>( `${ environment.serverUrl }/contribution/search`, {
      _id,
      contributor,
      date,
      title,
      categories,
      fill,
      limit,
      excludeCurrentUserContributions
    } )
    .pipe( map( contributions => {
        contributions.map( contribution => {
          const categoryResult = this.categoryService.getCategoryFromId( contribution.payload?.category,
            contribution.payload?.subCategory, contribution.payload?.leafCategory );

          if ( categoryResult.category ) {
            contribution.payload.category = categoryResult.category;
          }

          if ( categoryResult.subCategory ) {
            contribution.payload.subCategory = categoryResult.subCategory;
          }

          if ( categoryResult.leafCategory ) {
            contribution.payload.leafCategory = categoryResult.leafCategory;
          }

          this.checkInProgress( contribution )

          contribution.date = formatDate( new Date( contribution.date ), 'yyyy/MM/dd HH:mm Z', 'en-US' );
        } );

        if ( contributionType === ContributionTypes.Recommended ) {
          this.recommendedContributionsSubject.next( contributions );
        } else if ( contributionType === ContributionTypes.Searched ) {
          this.searchedContributionsSubject.next( contributions );
        } else if ( contributionType === ContributionTypes.Other ) {
          return contributions;
        }
      }));
  }

  attend( contributionId: string) {
    return this.http.get<any>( `${ environment.serverUrl }/contribution/attend?id=${ contributionId }` )
      .pipe( map ( updatedContribution => {
        this.updateContribution( updatedContribution, this.recommendedContributionsSubject );
        this.updateContribution( updatedContribution, this.recommendedContributionsByFollowingListSubject );

        if ( this.attendedContributionsSubject.getValue() ) {
          this.getAttendedContributions().subscribe();
        } else if ( this.searchedContributionsSubject.getValue() ) {
          this.updateContribution( updatedContribution, this.searchedContributionsSubject )
        }

        return updatedContribution;
      }));
  }

  drop( contributionId: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/contribution/drop?id=${ contributionId }` )
      .pipe( map( updatedContribution => {
        this.updateContribution( updatedContribution, this.recommendedContributionsSubject );
        this.updateContribution( updatedContribution, this.recommendedContributionsByFollowingListSubject );

        // if attendedContributions contains the contribution remove it
        const attendedContributions = this.attendedContributionsSubject.getValue();

        if ( attendedContributions ) {
          this.attendedContributionsSubject.next(
            attendedContributions.filter( contribution => contribution._id !== updatedContribution[0]._id )
          );
        }

        if ( this.searchedContributionsSubject.getValue() ) {
          this.updateContribution( updatedContribution, this.searchedContributionsSubject );
        }

        return updatedContribution;
      }));
  }

  private updateContribution( updatedContribution, targetContributions ): void {
    const contributions = targetContributions.getValue();

    const foundRecommendIndex = contributions.findIndex( x => x._id === updatedContribution[0]._id );

    if ( foundRecommendIndex !== -1 ) {
      contributions[foundRecommendIndex].count = updatedContribution[0].count;
      contributions[foundRecommendIndex].attended = updatedContribution[0].attended;
      targetContributions.next(contributions);
    }
  }

  resetContributions( contributionType: ContributionTypes ): void {
    if ( contributionType === ContributionTypes.Attended ) {
      this.attendedContributionsSubject.next( null );
    } else if ( contributionType === ContributionTypes.Searched ) {
      this.searchedContributionsSubject.next( null );
    }
  }

  count( contributionId: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/contribution/count?id=${ contributionId }` );
  }

  initSearchContributions(categories: any[]) {
    this.getRecommendedContributionsByFollowingList( '10' ).subscribe();

    this.search( undefined, undefined, new Date().toISOString(), undefined,
      categories, ContributionTypes.Recommended, categories.length !== 0, true ).subscribe();
  }

  getAttendedContributions( startDate?: string, endDate?: string ) {
    let queryParams = ``

    if ( startDate && endDate ) {
      queryParams += `startDate=${ startDate }&endDate=${ endDate }`
    }

    return this.http.get<any>( `${ environment.serverUrl }/contribution/attended?` + queryParams )
    .pipe( map( attendedContributions => {
      attendedContributions.map( contribution => {
        const categoryResult = this.categoryService.getCategoryFromId( contribution.payload?.category,
          contribution.payload?.subCategory, contribution.payload?.leafCategory );

        if ( categoryResult.category ) {
          contribution.payload.category = categoryResult.category;
        }

        if ( categoryResult.subCategory ) {
          contribution.payload.subCategory = categoryResult.subCategory;
        }

        if ( categoryResult.leafCategory ) {
          contribution.payload.leafCategory = categoryResult.leafCategory;
        }

        this.checkInProgress( contribution )
        contribution.date = formatDate( new Date( contribution.date ), 'yyyy/MM/dd HH:mm Z', 'en-US' );
      } );

      if ( startDate && endDate ) {
        return attendedContributions
      } else {
        this.attendedContributionsSubject.next( attendedContributions );
      }
    } ) );
  }

  markAsCompleted( contributionId: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/contribution/mark?id=${ contributionId }` );
  }

  getRecommendedContributionsByFollowingList( limit: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/contribution/by-following?limit=${ limit }` )
      .pipe( map( contributions => {
        contributions.map( contribution => {
          const categoryResult = this.categoryService.getCategoryFromId( contribution.payload?.category,
            contribution.payload?.subCategory, contribution.payload?.leafCategory );

          if ( categoryResult.category ) {
            contribution.payload.category = categoryResult.category;
          }

          if ( categoryResult.subCategory ) {
            contribution.payload.subCategory = categoryResult.subCategory;
          }

          if ( categoryResult.leafCategory ) {
            contribution.payload.leafCategory = categoryResult.leafCategory;
          }

          contribution.date = formatDate( new Date( contribution.date ), 'yyyy/MM/dd HH:mm Z', 'en-US' );
        } );

        this.recommendedContributionsByFollowingListSubject.next( contributions );
      } ) );
  }

  private checkInProgress( contribution ) {
    const currentDate = new Date()
    const contributionDate = new Date( contribution.date )
    if ( contributionDate.getTime() < currentDate.getTime() &&
      contributionDate.getTime() + contribution.duration * 60000 > currentDate.getTime() ) {
      contribution.inProgress = true
    }
  }

  getContributions(): Observable<ContributionModel[]> {
    return this.http.get<ContributionModel[]>( 'api/contributionData' ).pipe(
      tap(_ => console.log('fetched contributions'),
        catchError( this.handleError<ContributionService[]>('getContributions', []) ))
    )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  logout() {
    this.recommendedContributionsSubject.next( null );
    this.recommendedContributionsByFollowingListSubject.next( null );
  }
}
