import { environment } from '../../../environments/environment';
import { environmentCommon } from '../../../environments/environment-common';
import { ProductLine } from '../../model/product/product.model';
import { URLS } from '../navigation/navigation.data';
import { PRODUCT_RIBBONS } from '../ribbon/ribbon.data';
import { TECH_STACK } from '../tech-stack/tech-stack.data';
import { ThemeColorSettings } from '../theme/theme.data';

const OPEN_SOURCE_FEATURE = {
  name: $localize`:@@productData.openSource.name:Open Source`,
  description: $localize`:@@productData.openSource.description:No need to pay a price to get started. Get the latest updates from community driven open source project.`,
};

const PROFESSIONAL_HELP_FEATURE = {
  name: $localize`:@@productData.professionalHelp.name:Professional Help`,
  description: $localize`:@@productData.openSource.description:Get an up and running server.`,
};

const CUSTOMISED_SOLUTIONS_FEATURE = {
  name: $localize`:@@productData.customisedSolutions.name:Customised Solutions`,
  description: $localize`:@@productData.customisedSolutions.description:Fully customised functional solutions for your needs.`,
};

const CI_CD_AUTOMATION_FEATURE = {
  name: $localize`:@@productData.ciCdAutomation.name:CI/CD Automation`,
  description: $localize`:@@productData.ciCdAutomation.description:Get a CI/CD integration with automated API tests.`,
};

const CUSTOMISED_AUTOMATIONS_FEATURE = {
  name: $localize`:@@productData.customisedAutomations.name:Customised Automations`,
  description: $localize`:@@productData.customisedAutomations.description:Fully customised automation solutions for your needs.`,
};

const SECURITY_REPORTS_FEATURE = {
  name: $localize`:@@productData.customisedAutomationsSecurity.name:Reports`,
  description: $localize`:@@productData.customisedAutomationsSecurity.description:Get a security report at the end of each month.`,
};

const CUSTOM_SECURITY_COMPLIANCE_FEATURE = {
  name: $localize`:@@productData.customSecurityCompliance.name:Custom Security Compliance`,
  description: $localize`:@@productData.customSecurityCompliance.description:Fully customised security compliance solutions for your needs.`,
};

const DEFAULT_OPEN_SOURCE_SERVER_FEATURES = [
  {
    name: $localize`:@@productData.defaultOpenSourceServerFeatures.1:Core Features`,
    details: [
      OPEN_SOURCE_FEATURE,
      PROFESSIONAL_HELP_FEATURE,
      CUSTOMISED_SOLUTIONS_FEATURE,
    ],
  },
  {
    name: $localize`:@@productData.defaultOpenSourceServerFeatures.2:Quality and DX`,
    details: [
      CI_CD_AUTOMATION_FEATURE,
      CUSTOMISED_AUTOMATIONS_FEATURE,
    ],
  },
  {
    name: $localize`:@@productData.defaultOpenSourceServerFeatures.3:Security`,
    details: [
      SECURITY_REPORTS_FEATURE,
      CUSTOM_SECURITY_COMPLIANCE_FEATURE,
    ],
  },
];

const FREE_PRICING_OPTION = {
  title: $localize`:@@productData.freePricingOption.title:Free`,
  description: $localize`:@@productData.freePricingOption.description:For Individuals`,
  price: {
    currency: '$',
    value: '0',
    subscriptionTime: $localize`:@@productData.freePricingOption.price.subscriptionTime:mo.`,
  },
  features: [ [ 'true', '', '' ], [ '', '' ], [ '', '' ] ]
};

const STANDARD_PRICING_OPTION = {
  title: $localize`:@@productData.standardPricingOption.title:Standard`,
  description: $localize`:@@productData.standardPricingOption.description:For Startups`,
  ribbon: PRODUCT_RIBBONS.get( 'deal' ),
  contactRequired: true,
  features: [ [ 'true', 'true', '' ], [ 'true', '' ], [ $localize`:@@productData.standardPricingOption.features.1:Up to 10 users`, '' ] ]
};

const ENTERPRISE_PRICING_OPTION = {
  title: $localize`:@@productData.enterprisePricingOption.title:Enterprise`,
  description: $localize`:@@productData.enterprisePricingOption.description:For Enterprises`,
  contactRequired: true,
  features: [ [ 'true', 'true', 'true' ], [ 'true', 'true' ], [ $localize`:@@productData.enterprisePricingOption.features.1:Unlimited users`, 'true' ] ]
};

const DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS = [
  FREE_PRICING_OPTION,
  STANDARD_PRICING_OPTION,
  ENTERPRISE_PRICING_OPTION,
];

export const PRODUCT_LINES: ProductLine[] = [
  {
    key: 'server',
    name: 'Servers',
    description: $localize`:@@productLinesData.servers.description:Micro server solutions for your needs`,
    products: [
      {
        key: 'auth-server-template',
        name: 'Auth Server',
        description: $localize`:@@productLinesData.authServerTemplate.description:Auth Server Template is a generic open source authentication server that has simple yet powerful design to connect your business with all OAuth 2.0 and OAuth supporting third party companies (like Google, Facebook, Twitter or LinkedIn). It also supports basic username password authentication system.`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github + '/' + 'auth-server-template',
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/auth-server-logo.min.png',
        openSource: true,
        features: DEFAULT_OPEN_SOURCE_SERVER_FEATURES,
        pricingOptions: DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS,
        integrations: environment.oauth,
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.postgreSql,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
      {
        key: 'payment-server-template',
        name: 'Payment Server',
        description: $localize`:@@productLinesData.paymentServerTemplate.description:Payment Server Template is a generic open source payment server that has simple yet powerful design to connect your business with third party payment solution provider companies (like Stripe or Coinbase).`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github + '/' + 'payment-server-template',
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/payment-server-logo.min.png',
        openSource: true,
        features: DEFAULT_OPEN_SOURCE_SERVER_FEATURES,
        pricingOptions: DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS,
        integrations: environment.payment,
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.postgreSql,
          TECH_STACK.mongoDb,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
      {
        key: 'file-storage-server-template',
        name: 'File Storage Server',
        description: $localize`:@@productLinesData.fileStorageTemplate.description:File Storage Server Template is a generic open source file storage server that has simple yet powerful design to connect your business with third party file storage provider companies (like AWS S3).`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github + '/' + 'file-storage-server-template',
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/file-storage-server-logo.min.png',
        openSource: true,
        features: DEFAULT_OPEN_SOURCE_SERVER_FEATURES,
        pricingOptions: DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS,
        integrations: environment.fileStorage,
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.postgreSql,
          TECH_STACK.mongoDb,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
      {
        key: 'mail-server-template',
        name: 'Mail Server',
        description: $localize`:@@productLinesData.mailServerTemplate.description:Mail Server Template is a generic open source mail server that has simple yet powerful design to connect your business with third party email service providers (like Gmail, Yahoo or Outlook).`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github + '/' + 'mail-server-template',
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/mail-server-logo.min.png',
        openSource: true,
        features: DEFAULT_OPEN_SOURCE_SERVER_FEATURES,
        pricingOptions: DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS,
        integrations: environment.mail,
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
      {
        key: 'analytics-server-template',
        name: 'Analytics Server',
        description: $localize`:@@productLinesData.analyticsServerTemplate.description:Analytics Server Template is a generic open source analytics server that has simple yet powerful design to connect your business with third party analytics service providers (like Google Analytics or Matomo).`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github + '/' + 'analytics-server-template',
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/analytics-server-logo.min.png',
        openSource: true,
        features: DEFAULT_OPEN_SOURCE_SERVER_FEATURES,
        pricingOptions: DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS,
        integrations: environment.analytics,
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.mongoDb,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
      {
        key: 'business-logic-server-template',
        name: 'Business Logic Server',
        description: $localize`:@@productLinesData.businessLogicServerTemplate.description:Business Logic Server Template is a generic open source server that encodes the real-world business rules that determine how data can be created, stored, and changed. It saves you from rewriting boilerplate code. It works best with other Open Template Hub products.`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github + '/' + 'business-logic-server-template',
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/business-logic-server-logo.min.png',
        demonstrationImg: {
          src: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/demo/server/business-logic-server-demo.min.png',
          description: 'Server That Manages Your Core Business Functionalities'
        },
        openSource: true,
        features: DEFAULT_OPEN_SOURCE_SERVER_FEATURES,
        pricingOptions: DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS,
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.mongoDb,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
      {
        key: 'sms-server-template',
        name: 'Sms Server',
        color: ThemeColorSettings.gray,
        description: $localize`:@@productLinesData.smsServerTemplate.description:Coming soon..`,
        url: URLS.maintenance,
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/product-logo-question.min.png',
        openSource: true
      }
    ],
  },
  {
    key: 'premium',
    name: 'Premium',
    description: $localize`:@@servicesData.premium.description:Get more things done with our premium solutions`,
    color: ThemeColorSettings.yellow,
    products: [
      {
        key: 'orchestration-server-template',
        name: 'Orchestration Server',
        description: $localize`:@@premium.orchestrationServerTemplate.description:Orchestration Server Template is a middleware server that has simple yet powerful design to connect your business with all Open Template Hub servers (like Auth Server, Payment Server, File Storage Server or Mail Server). It also has generic design to integrate any other servers.`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github,
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/orchestration-server-logo.min.png',
        color: ThemeColorSettings.yellow,
        demonstrationImg: {
          src: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/demo/server/orchestration-server-demo.min.png',
          description: 'Orchestration Server Architectural Design'
        },
        features: [
          {
            name: $localize`:@@premium.orchestrationServerTemplate.feature.1:Core Features`,
            details: [
              {
                name: $localize`:@@premium.orchestrationServerTemplate.feature.1.detail.1:Integrated with OTH Servers`,
                description: $localize`:@@premium.orchestrationServerTemplate.feature.1.detail.2:Works seamlessly with Open Template Hub Servers.`,
              },
              PROFESSIONAL_HELP_FEATURE,
              CUSTOMISED_SOLUTIONS_FEATURE,
            ],
          },
          {
            name: `Quality and DX`,
            details: [
              CI_CD_AUTOMATION_FEATURE,
              CUSTOMISED_AUTOMATIONS_FEATURE,
            ],
          },
          {
            name: `Security`,
            details: [
              SECURITY_REPORTS_FEATURE,
              CUSTOM_SECURITY_COMPLIANCE_FEATURE,
            ],
          },
        ],
        pricingOptions: [
          {
            title: $localize`:@@premium.orchestrationServer.basic.title:Basic`,
            description: $localize`:@@premium.orchestrationServer.basic.description:For Individuals`,
            features: [ [ 'true', '', '' ], [ '', '' ], [ '', '' ] ],
            price: {
              currency: '$',
              value: '99',
              subscriptionTime: '',
            },
          },
          {
            title: $localize`:@@premium.orchestrationServer.standard.title:Standard`,
            description: $localize`:@@premium.orchestrationServer.standard.description:For Startups`,
            ribbon: PRODUCT_RIBBONS.get( 'deal' ),
            contactRequired: true,
            features: [ [ 'true', 'true', '' ], [ 'true', '' ], [ $localize`:@@premium.orchestrationServer.standard.feature.1:Up to 10 users`, '' ] ]
          },
          {
            title: $localize`:@@premium.orchestrationServer.enterprise.title:Enterprise`,
            description: $localize`:@@premium.orchestrationServer.enterprise.description:For Enterprises`,
            contactRequired: true,
            features: [ [ 'true', 'true', 'true' ], [ 'true', 'true' ], [ $localize`:@@premium.orchestrationServer.enterprise.feature.1:Unlimited users`, 'true' ] ]
          },
        ],
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
    ],
  },
];

export const SERVICES: ProductLine[] = [
  {
    key: 'services',
    name: 'Services',
    description: $localize`:@@servicesData.description:Services that we provide`,
    products: [
      {
        key: 'software-consultancy',
        name: 'Software Consultancy',
        description: $localize`:@@servicesData.softwareConsultancy.description:We perform world-class custom software development services from startups to enterprise businesses. Our highly experienced software developers have a deep understanding of how to leverage top programming languages, frameworks, and other software development tools to create the ideal solution for your business.`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github,
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/brand-logo.min.png',
        features: [ {
          name: $localize`:@@servicesData.softwareConsultancy.features.name:Features`,
          details: [
            {
              name: $localize`:@@servicesData.softwareConsultancy.features.details.1.name:Custom Application Development`,
              description: $localize`:@@servicesData.softwareConsultancy.features.details.1.description:We rely on our industry-specific technology experience to deliver highly scalable, flexible, and interoperable web, mobile, desktop, and hybrid applications.`
            },
            {
              name: $localize`:@@servicesData.softwareConsultancy.features.details.2.name:Application Maintenance`,
              description: $localize`:@@servicesData.softwareConsultancy.features.details.2.description:Our app maintenance & modernization services are designed to ensure the scalability, performance, and sustainability of your entire software infrastructure.`
            },
            {
              name: $localize`:@@servicesData.softwareConsultancy.features.details.3.name:Implementation & Deployment`,
              description: $localize`:@@servicesData.softwareConsultancy.features.details.3.description:We devise an in-depth, comprehensive software implementation & deployment plan, assessing your needs to deliver enhanced technologies to end-users.`
            },
          ],
        }
        ],
      },
      {
        key: 'software-integration',
        name: 'Software Integration',
        description: $localize`:@@servicesData.softwareIntegration.description:When a company adopts a new technology or business process, they face many challenges between their current applications and systems and the complicated software implementation process. Our industry-specific software engineers handle all of your challenging integration & implementation obstacles, including architectural design, testing, debugging, and execution.`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github,
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/brand-logo-pieces.min.png',
        features: [ {
          name: $localize`:@@servicesData.softwareIntegration.features.name:Features`,
          details: [
            {
              name: $localize`:@@servicesData.softwareIntegration.features.details.1.name:Data Integration Services`,
              description: $localize`:@@servicesData.softwareIntegration.features.details.1.description:We perform data integration services, including merging data, consolidating business processes, and creating Database Management Systems to ensure complete data integrity during the transfer process.`
            },
            {
              name: $localize`:@@servicesData.softwareIntegration.features.details.2.name:API Integration Services`,
              description: $localize`:@@servicesData.softwareIntegration.features.details.2.description:We provide integrating custom-built and third-party APIs service. We, integrate, and customize add web service functionality to mobile and web applications, and seamlessly synchronize data formats across these applications.`
            },
            {
              name: $localize`:@@servicesData.softwareIntegration.features.details.3.name:Enterprise Application Integrations`,
              description: $localize`:@@servicesData.softwareIntegration.features.details.3.description:We provide Enterprise Application Integration solutions, facilitating seamless communications between business platforms. We are providing integrations for content management, accounting, customer relationship management, analytics, and marketing.`
            },
          ],
        }
        ],
      },
      {
        key: 'quality-assurance',
        name: 'Quality Assurance',
        description: $localize`:@@servicesData.qualityAssurance.description:We deliver full-cycle QA automated software testing for web, mobile, and desktop applications to enable improved test coverage, enhance product quality, optimize testing activities, boost productivity, and decrease overall testing times.`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.oth.social.github,
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/brand-logo-shine.min.png',
        features: [ {
          name: $localize`:@@servicesData.qualityAssurance.features.name:Features`,
          details: [
            {
              name: $localize`:@@servicesData.qualityAssurance.features.details.1.name:Software QA Automation Testing`,
              description: $localize`:@@servicesData.qualityAssurance.features.details.1.description:We deliver full-cycle QA automated software testing for web, mobile, and desktop applications to enable improved test coverage, enhance product quality, optimize testing activities, boost productivity, and decrease overall testing times.`
            },
            {
              name: $localize`:@@servicesData.qualityAssurance.features.details.2.name:Software QA Manual Testing`,
              description: $localize`:@@servicesData.qualityAssurance.features.details.2.description:Our dedicated QA team will test your mobile, web, or desktop application manually to identify & fix bugs, detect & eradicate errors, and confirm its compliance with regulatory standards, providing you with the highest quality result possible.`
            },
            {
              name: $localize`:@@servicesData.qualityAssurance.features.details.3.name:Software QA Usability Testing`,
              description: $localize`:@@servicesData.qualityAssurance.features.details.3.description:We design QA usability testing platforms that incorporate specific usability testing tools and UX research methods selected based on the client, focused on measuring how user-friendly and flexible your application or website is.`
            },
          ],
        }
        ]
      },
    ],
  },
];
