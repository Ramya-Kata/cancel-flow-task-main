// flowGraph.ts
import { FlowGraph } from './types'

export const flowGraph: FlowGraph = {
  start: 'start',
  nodes: {
    start: {
      id: 'start',
      component: 'Start',
      edges: { job_yes: 'job_found', job_no: 'job_not_yet' },
    },

    job_found: {
      id: 'job_found',
      component: 'JobCongrats1',
      edges: { back: 'start', continue: 'suggestions' },
    },

    suggestions: {
      id: 'suggestions',
      component: 'Suggestions',
      edges: { back: 'job_found', continue: 'visa_support' },
    },

    visa_support: {
      id: 'visa_support',
      component: 'VisaSupport',
      edges: { back: 'suggestions', yes: 'visa_yes', no: 'visa_no' }, 
    },

    visa_yes: {
      id: 'visa_yes',
      component: 'VisaYes',
      edges: { back: 'visa_support', done: 'cancel_done_visa_help_yes' },
    },

    visa_no: {
      id: 'visa_no',
      component: 'VisaNo',
      edges: { back: 'visa_support', done: 'cancel_done_visa_help_no' },
    },
    cancel_done_visa_help_yes: {
      id: 'cancel_done_visa_help_yes',
      component: 'CancelDoneVisaHelpYes',
      edges: { back: 'visa_support' },
    },
    cancel_done_visa_help_no: {
      id: 'cancel_done_visa_help_no',
      component: 'CancelDoneVisaHelpNo',             
      edges: { back: 'visa_support' },
    },
    job_not_yet: {
      id: 'job_not_yet',
      component: 'OfferStillLooking',
      edges: { back: 'start', accept: 'subscription_continued', decline: 'usage' },
    },
    subscription_continued: {
      id: 'subscription_continued',
      component: 'SubscriptionContinued',
      edges: { back: 'job_not_yet' },       
    },

    usage: {
      id: 'usage',
      component: 'OfferDeclinedUsage1', 
      edges: { back: 'job_not_yet', accept: 'subscription_continued', continue: 'reasons' },
    },
    reasons: {
      id: 'reasons',
      component: 'CancelReasons',
      edges: {
        back: 'usage',
        accept: 'subscription_continued',         
        too_expensive: 'reason_too_expensive', 
        platform_not_helpful: 'reason_platform_not_helpful',
        not_enough_jobs: 'reason_not_enough_jobs',
        not_to_move:'reason_not_to_move',
        other:'reason_other',
      },
    },
    reason_too_expensive: {
      id: 'reason_too_expensive',
      component: 'ReasonTooExpensive',
      edges: {
        back: 'reasons',
        accept: 'subscription_continued',
        complete: 'cancel_end',
      },
    },
    reason_platform_not_helpful: {
      id: 'reason_platform_not_helpful',
      component: 'ReasonPlatformNotHelpful',
      edges: {
        back: 'reasons',
        accept: 'subscription_continued',
        complete: 'cancel_end',
      },
    },
    reason_not_enough_jobs: {
      id: 'reason_not_enough_jobs',
      component: 'ReasonNotEnoughJobs',
      edges: {
        back: 'reasons',
        accept: 'subscription_continued',
        complete: 'cancel_end',
      },
    },
    reason_not_to_move: {
      id: 'reason_not_to_move',
      component: 'ReasonNotToMove',
      edges: {
        back: 'reasons',
        accept: 'subscription_continued',
        complete: 'cancel_end',
      },
    },
    reason_other: {
      id: 'reason_other',
      component: 'ReasonOther',
      edges: {
        back: 'reasons',
        accept: 'subscription_continued',
        complete: 'cancel_end',
      },
    },
    cancel_end: {
      id: 'cancel_end',
      component: 'CancelEnd',
      edges: { back:'start' },
    },
    confirm_cancel: {
      id: 'confirm_cancel',
      component: 'ConfirmCancel',
      edges: { yes: 'pick_reason', no: 'success_keep', back: 'start' },
    },
  },
}
