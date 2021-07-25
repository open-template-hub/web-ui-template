import { formatDate } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePickerComponent, IDayCalendarConfig } from 'ng2-date-picker';
import { BasicInfoService } from '../../../service/basic-info/basic-info.service';
import { CategoryService } from '../../../service/category/category.service';
import { ContributionService } from '../../../service/contribution/contribution.service';
import { InformationService } from '../../../service/information/information.service';
import { LoadingService } from '../../../service/loading/loading.service';
import { ToastService } from '../../../service/toast/toast.service';
import { RIBBONS, URLS } from '../../../util/constant';
import { environment } from '../../../../environments/environment';

@Component( {
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: [ './contribute.component.scss' ]
} )
export class ContributeComponent implements OnInit, OnDestroy {

  contributeForm: FormGroup;
  submitted = false;
  loading = false;
  URLS = URLS;
  RIBBONS = RIBBONS;

  isSticky = false;

  cardTitle = 'Add Contribution';

  searchedContributions = [];

  defaultCategory: any = {
    category: { name: 'Teaching & Academics', id: 13 },
    subCategory: { name: 'Online Education', id: 5 },
    leafCategory: undefined
  }

  selectedCategory: any = { ...this.defaultCategory }

  categorySearchResults = [];

  searchEnabled = true;

  searchQuery = '';

  todayDateTime = formatDate( new Date(), 'yyyy/MM/ddTHH:mmZ', 'en-US' );

  dayPickerConfig = {
    locale: 'en',
    format: 'yyyy/MM/DD HH:mm',
    firstDayOfWeek: 'mo',
    min: this.todayDateTime
  } as unknown as IDayCalendarConfig;

  myUpcomingContributions = [];
  myRecentlyCompletedContributions = [];
  myPassedContributions = [];

  defaultFormValues = {
    _id: null,
    title: '',
    description: '',
    link: '',
    trailerVideoLink: '',
    isTrailerVideoLinkActive: false,
    date: '',
    durationHour: '0',
    durationMin: '45',
    isDurationActive: false,
    isEmailAllowed: false,
    isPremium: false,
    price: '5.00',
    category: ''
  }

  // for "Premium content cannot be changed to free"
  previousPrice: string;

  @ViewChild( 'searchArea' ) searchArea: ElementRef;
  @ViewChild( 'dateArea' ) public dateFromDp: DatePickerComponent;

  constructor(
      private formBuilder: FormBuilder,
      private loadingService: LoadingService,
      private toastService: ToastService,
      private route: ActivatedRoute,
      private router: Router,
      private informationService: InformationService,
      private contributionService: ContributionService,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private basicInfoService: BasicInfoService
  ) {}

  ngOnInit(): void {
    const userInfo = this.basicInfoService.userInfoSubject.getValue()
    if( !userInfo?.payload?.contributorProfileActivated ) {
      this.router.navigate( [ URLS.dashboard.root ]).then( () => {
        this.informationService.setInformation( `Enable contributor profile to view this page`, 'info' );
      } );
    }

    this.contributeForm = this.formBuilder.group( {
      _id: [ this.defaultFormValues._id ],
      title: [ this.defaultFormValues.title, Validators.required ],
      description: [ this.defaultFormValues.description, Validators.maxLength( 500 ) ],
      link: [ this.defaultFormValues.link, Validators.pattern( '^.+:\\/\\/.*$' ) ],
      trailerVideoLink: [ this.defaultFormValues.trailerVideoLink, Validators.pattern( '^(https:\\/\\/www.)?youtube.com/watch\\?v=.{11}$' ) ],
      isTrailerVideoLinkActive: [ this.defaultFormValues.isTrailerVideoLinkActive ],
      date: [ this.defaultFormValues.date, Validators.required ],
      durationHour: [ this.defaultFormValues.durationHour, Validators.pattern('^([0-1]?[0-9]|2[0-3])$') ],
      durationMin: [ this.defaultFormValues.durationMin, Validators.pattern('^([0-9]|([0-5][0-9]))$') ],
      isDurationActive: [ this.defaultFormValues.isDurationActive ],
      isEmailAllowed: [ this.defaultFormValues.isEmailAllowed ],
      isPremium: [ this.defaultFormValues.isPremium ],
      price: [ this.defaultFormValues.price, Validators.pattern( '^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$' ) ],
      category: [ this.defaultFormValues.category ]
    } );

    this.contributionService.me( 'true' )
    .subscribe( myUpcomingContributions => {
      this.myUpcomingContributions = myUpcomingContributions;

      if ( this.activatedRoute.snapshot.queryParams.editable && this.activatedRoute.snapshot.queryParams.contribution_id ) {
        this.fillForm( this.activatedRoute.snapshot.queryParams.contribution_id )
      }
    } );

    this.contributionService.me('false' )
    .subscribe( myRecentlyCompletedContributions => {
      this.myRecentlyCompletedContributions = myRecentlyCompletedContributions
    })

    this.contributionService.me('false', 'true' )
    .subscribe( myPassedContributions => {
      this.myPassedContributions = myPassedContributions
      this.searchedContributions = [...myPassedContributions]
    })

    this.dayPickerConfig = {
      ...this.dayPickerConfig
    };

    this.selectedCategory = { ...this.defaultCategory };
  }

  @HostListener( 'document:click', [ '$event' ] )
  onDocumentClick( event ) {
    if ( this.searchArea.nativeElement.contains( event.target ) ) {
      this.searchEnabled = true;
    } else {
      this.searchEnabled = false;
    }
  }

  @HostListener( 'window:scroll', [ '$event' ] )
  checkScroll() {
    this.isSticky = window.pageYOffset >= 90;
  }

  get f() {
    return this.contributeForm.controls;
  }

  onSubmit() {
    if ( this.loading ) {
      return;
    }

    this.submitted = true;

    // set errors manually
    if ( this.f.isPremium.value && ( this.f.price.value === '' || parseFloat(this.f.price.value) < 5 ) ) {
      this.f.price.setErrors({ incorrect: true } );
    }

    if ( this.f.link.value === '' ) {
      this.f.link.setErrors( { incorrect: true } );
    }

    if ( this.f.isTrailerVideoLinkActive.value && this.f.trailerVideoLink.value === '' ) {
      this.f.trailerVideoLink.setErrors( { incorrect: true } );
    }

    // mark as valid if the activations not enabled
    if ( !this.f.isTrailerVideoLinkActive.value ) {
      this.f.trailerVideoLink.setValue( this.defaultFormValues.trailerVideoLink );
    }

    // for "Premium content cannot be changed to free"
    this.previousPrice = this.f.price.value
    if ( !this.f.isPremium.value ) {
      this.f.price.setValue( this.defaultFormValues.price );
    }

    // stop here if form is invalid
    if ( this.contributeForm.invalid ) {
      if ( this.f.title.invalid ) {
        this.toastService.error( 'Please provide a title.', '', {
          positionClass: this.route.parent.snapshot.data.layout
        } );
      }
      if ( this.f.date.invalid ) {
        this.toastService.error( 'Please provide a date.', '', {
          positionClass: this.route.parent.snapshot.data.layout
        } );
      }
      if ( this.f.durationMin.invalid || this.f.durationHour.invalid ) {
        this.toastService.error( 'Please provide a valid duration.', '', {
          positionClass: this.route.parent.snapshot.data.layout
        } );
      }
      if ( this.f.link.invalid ) {
        this.toastService.error( 'Please provide a valid url (Ex. "https://opentemplatehub.com")', '', {
          positionClass: this.route.parent.snapshot.data.layout
        } );
      }
      if ( this.f.trailerVideoLink.invalid ) {
        this.toastService.error( 'Please provide a valid youtube video url (Ex. "https://www.youtube.com/watch?v=11111111111")', '', {
          positionClass: this.route.parent.snapshot.data.layout
        } );
      }
      if ( this.f.price.invalid ) {
        this.toastService.error( 'Price must be minimum 5.00$', '', {
          positionClass: this.route.parent.snapshot.data.layout
        } );
      }
      return;
    }

    this.addEditContribution();

  }

  ngOnDestroy() {
  }

  resetContributionForm() {
    this.cardTitle = 'Add Contribution';
    this.submitted = false;
    this.contributeForm.reset( this.defaultFormValues );
    this.selectedCategory = { ...this.defaultCategory };
  }

  getUserContributions() {
    this.contributionService.me( 'true' )
    .subscribe( myContributions => {
      this.myUpcomingContributions = myContributions;
    } );
  }

  fillForm( id: string ): void {
    for ( const contribution of this.myUpcomingContributions ) {
      if ( contribution._id === id ) {
        this.contributeForm = this.formBuilder.group( {
          _id: [ contribution._id ],
          title: [ contribution.title, Validators.required ],
          description: [ contribution.payload.description, Validators.maxLength( 500 ) ],
          link: [ contribution.link, Validators.pattern( '^.+:\\/\\/.*$' ) ],
          trailerVideoLink: [ contribution.payload.trailerVideoLink ?
              'https://www.youtube.com/watch?v=' + contribution.payload.trailerVideoLink : '', Validators.pattern( '^(https:\\/\\/www.)?youtube.com/watch\\?v=.{11}$' ) ],
          isTrailerVideoLinkActive: [ !!contribution.payload.trailerVideoLink ],
          date: [ formatDate( new Date( contribution.date ), 'yyyy/MM/dd HH:mm', 'en-US' ), Validators.required ],
          durationHour: [ Math.floor( contribution.duration / 60 ).toString(), Validators.pattern( '^([0-1]?[0-9]|2[0-3])$' ) ],
          durationMin: [ ( contribution.duration % 60 ).toString(), Validators.pattern( '^([0-9]|([0-5][0-9]))$' ) ],
          isDurationActive: [ true ],
          isEmailAllowed: [ !!contribution.contributor.email ],
          isPremium: [ contribution.isPremium ],
          price: [ contribution.payload.price ? contribution.payload.price : this.defaultFormValues.price, Validators.pattern( '^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?$' ) ],
          category: [ contribution.category ]
        } );

        this.contributeForm.controls.category.markAsTouched();

        this.selectedCategory = {
          category: contribution.payload.category,
          subCategory: contribution.payload.subCategory,
          leafCategory: contribution.payload.leafCategory
        };

        window.scroll( 0, 0 );
        this.cardTitle = 'Edit Contribution';
        return;
      }
    }
  }

  private addEditContribution() {
    const payload: any = {
      description: this.f.description.value,
      category: this.selectedCategory.category.id,
      subCategory: this.selectedCategory.subCategory?.id,
      leafCategory: this.selectedCategory.leafCategory?.id
    };

    if ( this.f.isPremium.value ) {
      payload.price = this.f.price.value;
    }

    if ( this.f.isTrailerVideoLinkActive.value ) {
      payload.trailerVideoLink = this.f.trailerVideoLink.value.substr(-11, 11);
    }

    const date = new Date( this.f.date.value );

    const contribution = {
      _id: this.f._id.value,
      title: this.f.title.value,
      isPremium: this.f.isPremium.value,
      date: date.toISOString(),
      duration: this.f.isDurationActive.value ? (+this.f.durationHour.value) * 60 + (+this.f.durationMin.value) : 45,
      isEmailAllowed: this.f.isEmailAllowed.value,
      link: this.f.link.value,
      payload,
      paymentConfigKey: environment.payment.stripe.tag,
      imageUrl: environment.contributionImageUrl
    };

    // if contribution._id is not null, update, else create
    if ( contribution._id ) {
      this.contributionService.update( contribution )
      .subscribe( () => {
        this.toastService.info( 'Contribution updated' );
        this.resetContributionForm();
        this.getUserContributions();
        this.router.navigate( [ URLS.dashboard.contribute ] );
      }, ( error ) => {
        if ( error.error.message.startsWith( "Premium content cannot be changed to free") ) {
          this.f.isPremium.setValue( true )
          this.f.price.setValue( this.previousPrice )
        }
      } );
    } else {
      this.contributionService.create( contribution )
      .subscribe( () => {
            this.resetContributionForm();
            this.getUserContributions();
          }
      );
    }
  }

  search( event: any ) {
    const q = event.target.value;

    if ( !q || q.length < 3 ) {
      this.categorySearchResults = [];
      return;
    }

    this.categoryService.search( q ).subscribe( results => {
      this.categorySearchResults = results.slice( 0, 10 );
    } );
  }

  searchInAllContributions( event: any ) {
    let q = '';

    if (!event) {
      q = this.searchQuery;
    } else {
      q = event.target.value;
      this.searchQuery = q;
    }

    if ( !q || q.length < 3 ) {
      this.searchedContributions = [...this.myPassedContributions]
      return;
    }

    this.contributionService.me( 'false', 'true', q )
    .subscribe( searchedContributions => {
        this.searchedContributions = searchedContributions
    });
  }

  markAsCompletedButtonClicked( event: string ) {
    // remove the item from recentlyPassedContributions
    this.myRecentlyCompletedContributions.forEach( ( item, index ) => {
      if ( item._id === event ) {
        this.myRecentlyCompletedContributions.splice( index, 1 )
      }
    } )

    // refresh passedContributions
    this.contributionService.me('false', 'true' )
    .subscribe( myPassedContributions => {
      this.myPassedContributions = myPassedContributions
      this.searchedContributions = [...myPassedContributions]
    })
  }
}
