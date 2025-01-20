import dotenv from 'dotenv'
import { join, resolve } from 'path'

const envFilePath = join(resolve('./'), '.env')

dotenv.config({ path: envFilePath })
