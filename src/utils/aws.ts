import { RemovalPolicy } from '@aws-cdk/core'
import { AccountRecovery } from '@aws-cdk/aws-cognito'

/**
 * Sets removal policy
 * @param isProd - Sets removal policy to retain if true
 * @returns { RemovalPolicy }
 */
export const setRemovalPolicy = (isProd = false): RemovalPolicy => {
  return isProd === true ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY
}

/**
 * Sets Account Recovery policy
 * @param isProd - Sets removal policy to retain if true
 * @returns { RemovalPolicy }
 */
export const setAccountRecovery = (isProd = false): AccountRecovery => {
  return isProd === true
    ? AccountRecovery.EMAIL_ONLY
    : AccountRecovery.EMAIL_AND_PHONE_WITHOUT_MFA
}
