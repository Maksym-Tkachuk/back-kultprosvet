import { Injectable } from '@nestjs/common'
import * as Joi from 'joi'

import { EnvVar } from '../constants/envVar'

@Injectable()
export class ConfigValidationService {
  static createSchema(): Joi.ObjectSchema {
    return Joi.object({
      [EnvVar.PORT]: Joi.number().required(),
      [EnvVar.CORS_DOMAINS]: Joi.string().required(),
    })
  }
}
