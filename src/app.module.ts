import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
// import * as mongoosePaginate from 'mongoose-paginate-v2';

import configuration from './config/configuration';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { MongoExceptionFilter } from './shared/filters/mongo-exception.filter';
// import { HttpExceptionFilter } from './shared/filters/http-exception-v2.filter';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        const uri = dbConfig.uri;
        console.warn('MongoDB URI: ', uri);

        return {
          uri,
          // autoIndex: true,
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        };
      },
    }),
    // custom modules
    ProductModule,
    CustomerModule,
    OrderModule,
    PaymentModule,
  ],

  providers: [
    // Global Interceptor for Logging
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // Global Filters for Handling Errors
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
    // Global Filters for Handling Errors -> Moved to main.ts
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})

export class AppModule {}
