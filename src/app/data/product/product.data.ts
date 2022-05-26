import { environment } from '../../../environments/environment';
import { environmentCommon } from '../../../environments/environment-common';
import { ProductLine } from '../../model/product/product.model';
import { PRODUCT_RIBBONS } from '../ribbon/ribbon.data';
import { TECH_STACK } from '../tech-stack/tech-stack.data';

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
        url: environmentCommon.website.github.url + '/' + environmentCommon.company.social.github + '/' + 'auth-server-template',
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
        url: environmentCommon.website.github.url + '/' + environmentCommon.company.social.github + '/' + 'payment-server-template',
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
        url: environmentCommon.website.github.url + '/' + environmentCommon.company.social.github + '/' + 'file-storage-server-template',
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
        url: environmentCommon.website.github.url + '/' + environmentCommon.company.social.github + '/' + 'mail-server-template',
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
        url: environmentCommon.website.github.url + '/' + environmentCommon.company.social.github + '/' + 'analytics-server-template',
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
        key: 'sms-server-template',
        name: 'Sms Server',
        description: $localize`:@@productLinesData.smsServerTemplate.description:SMS Server Template is a generic open source sms server that has simple yet powerful design to connect your business with third party sms service providers (like Twillio or AWS SNS).`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.company.social.github + '/' + 'sms-server-template',
        logo: 'https://raw.githubusercontent.com/open-template-hub/open-template-hub.github.io/master/assets/min/logo/server/sms-server-logo.min.png',
        openSource: true,
        features: DEFAULT_OPEN_SOURCE_SERVER_FEATURES,
        pricingOptions: DEFAULT_OPEN_SOURCE_SERVER_PRICING_OPTIONS,
        integrations: environment.sms,
        techStack: [
          TECH_STACK.typeScript,
          TECH_STACK.node,
          TECH_STACK.express,
          TECH_STACK.heroku,
          TECH_STACK.npm
        ]
      },
      {
        key: 'business-logic-server-template',
        name: 'Business Logic Server',
        description: $localize`:@@productLinesData.businessLogicServerTemplate.description:Business Logic Server Template is a generic open source server that encodes the real-world business rules that determine how data can be created, stored, and changed. It saves you from rewriting boilerplate code. It works best with other Open Template Hub products.`,
        url: environmentCommon.website.github.url + '/' + environmentCommon.company.social.github + '/' + 'business-logic-server-template',
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
      }
    ],
  }
];

