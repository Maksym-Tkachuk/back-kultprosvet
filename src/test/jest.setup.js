import dotenv from 'dotenv'
import { join, resolve } from 'path'

const envFilePath = join(resolve('./'), '.env.test')

dotenv.config({ path: envFilePath })
