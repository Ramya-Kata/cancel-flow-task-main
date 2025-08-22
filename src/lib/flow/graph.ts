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
      edges: { back: 'start', accept: 'success_keep', decline: 'confirm_cancel' },
    },
    

    confirm_cancel: {
      id: 'confirm_cancel',
      component: 'ConfirmCancel',
      edges: { yes: 'pick_reason', no: 'success_keep', back: 'start' },
    },
  },
}
