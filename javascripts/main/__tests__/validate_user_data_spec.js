import {assert} from 'chai'
import validateUserData from '../validate_user_data'

const ONE_DAY = 86400

describe('validateUserData', () => {
  it('returns false for empty data', () => {
    const userData = {}
    assert.equal(validateUserData(userData), false)
  })

  it('returns false for expired token', () => {
    const date = new Date()
    date.setSeconds(date.getSeconds() - ONE_DAY - 60)

    const userData = {
      access_token: '123ert',
      fetched_at: date
    }
    assert.equal(validateUserData(userData), false)
  })

  it('returns true for valid token', () => {
    const date = new Date()

    const userData = {
      access_token: '123ert',
      fetched_at: date
    }
    assert.equal(validateUserData(userData), true)
  })
})
