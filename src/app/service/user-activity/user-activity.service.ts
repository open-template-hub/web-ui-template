import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CategoryService } from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) { }

  getContributionsTaken( username: string, limit = 10 ) {
    return this.http.get<any>( `${ environment.serverUrl }/user-activity/lessons-taken?username=${ username }&limit=${ limit }` )
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

  getContributorRate( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/user-activity/contributor-rate?username=${ username }` );
  }

  getNumberOfContributionsMade( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/user-activity/number-of-contributions-made?username=${ username }` );
  }

  getUnratedCompletedContributions () {
    return this.http.get<any>( `${ environment.serverUrl }/user-activity/contribution` )
      .pipe( map( response => {
        response[0].completedContributions.map( contribution => {
          const categoryResult = this.categoryService.getCategoryFromId( contribution.category?.category,
            contribution.category?.subCategory, contribution.category?.leafCategory );

          // to make similar to contribution json
          const contributor = contribution.contributor
          contribution.contributor = {
            username : contribution.contributor
          }

          contribution.payload = {
            category: categoryResult.category,
            subCategory: categoryResult.subCategory,
            leafCategory: categoryResult.leafCategory
          }
          contribution.category = undefined
        } );
        return response
      } ) );
  }

  rate( id: string, rate: number ) {
    return this.http.put<any>( `${ environment.serverUrl }/user-activity/rate`, {
      id,
      rate
    } )
  }

  formatNumberOfRates( rateNumber: number ): string {
    let fractionDigits = 1
    if( rateNumber > 999 && rateNumber < 1000000 ){
      if ( rateNumber % 1000 < 100 ) {
        fractionDigits = 0
      }
      return ( rateNumber / 1000 ).toFixed( fractionDigits ) + 'K';
    } else if( rateNumber > 999999 ) {
      if ( rateNumber % 1000000 < 100000 ) {
        fractionDigits = 0
      }
      return ( rateNumber / 1000000 ).toFixed( fractionDigits ) + 'M';
    } else if( rateNumber < 1000 ) {
      return rateNumber.toString(); // if value < 1000, nothing to do
    }
  }

  getTopContributors( limit: number = 3 ) {
    return this.http.get<any>( `${ environment.serverUrl }/user-activity/top-contributors?limit=${ limit }` );
  }

  getNumberOfContributionsTaken( username: string ) {
    return this.http.get<any>( `${ environment.serverUrl }/user-activity/number-of-contributions-taken?username=${ username }` );
  }
}
