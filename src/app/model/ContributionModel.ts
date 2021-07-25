export interface ContributionModel {
  _id: string
  attendees: string[]
  title: string
  isPremium: boolean
  date: string
  link: string
  duration: number
  createdDate: string
  contributor: { username: string, email?: string }
  payload: any
}
