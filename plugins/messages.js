import * as constants from '~/constants'

export default ({ app }, inject) => {
	inject('messages', {
		VOTE: {
			[constants.VOTE_YES]: 'Yes',
			[constants.VOTE_NO]: 'No'
		},

		TAG: {
			[constants.TAG_UNEXPECTED]: 'Unexpected',
			[constants.TAG_CHANGE_IN_FUTURE]: 'Will change in the future',
			[constants.TAG_UNFAIR]: 'Unfair',
			[constants.TAG_NOT_WHOLE]: 'Not the whole story',
			[constants.TAG_PRETTY_MUCH_TRUE]: 'Pretty much true',
			[constants.TAG_WEIRD]: 'Weird',
			[constants.TAG_EXPECTED]: 'Expected'
		},

		ACTIVITY: {
			[constants.ACTIVITY_QUESTION]: 'Question created',
			[constants.ACTIVITY_VOTE]: 'Question answered',
			[constants.ACTIVITY_TAG]: 'Question tagged',
			[constants.ACTIVITY_COMMENT]: 'Question commented',
			[constants.ACTIVITY_SOMEONE_VOTE]: 'Someone answer your question',
			[constants.ACTIVITY_SOMEONE_TAG]: 'Someone tag your question',
			[constants.ACTIVITY_SOMEONE_COMMENT]: 'Someone commented your question',
			[constants.ACTIVITY_SOMEONE_REPLY]: 'Someone reply to your question',
			[constants.ACTIVITY_OTHERS_VOTE_AS_WELL]: 'Others answered as well'
		},

		MARK: {
			[constants.MARK_SPAM]: 'Spam',
			[constants.MARK_LIKE]: 'Like'
		},

		SEX: {
			[constants.SEX_MALE]: 'Male',
			[constants.SEX_FEMALE]: 'Female'
		},

		EDUCATION: {
			[constants.EDUCATION_LEVEL_PRIMARY_SCHOOL]: 'Primary School',
			[constants.EDUCATION_LEVEL_SECONDARY_SCHOOL]: 'Secondary School',
			[constants.EDUCATION_LEVEL_SPECIALIST]: 'Specialist',
			[constants.EDUCATION_LEVEL_BACHELOR]: 'Bachelor',
			[constants.EDUCATION_LEVEL_MASTER]: 'Master',
			[constants.EDUCATION_LEVEL_DOCTORATE]: 'Doctorate'
		},

		INCOME: {
			[constants.INCOME_LEVEL_MIN]: 'Lower',
			[constants.INCOME_LEVEL_MIDDLE]: 'Middle',
			[constants.INCOME_LEVEL_MAX]: 'Upper'
		},

		NOTIF_TYPE: {
			[constants.NOTIF_TYPE_TRANDING]: 'Tranding list (every 30 days)',
			[constants.NOTIF_TYPE_SOMEONE_COMMENT_YOUR_Q]: 'Someone comment your question',
			[constants.NOTIF_TYPE_SOMEONE_COMMENT_SAME_Q]: 'Someone comment same question',
		}
	})
}
