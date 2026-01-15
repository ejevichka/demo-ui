// Feedback API hub - routes to correct API based on theme
import type { ThemeName } from '@/types';
import { submitKrupsFeedback } from './krupsApi';
import { submitBluemarketFeedback } from './bluemarketApi';
import { submitBeautyFeedback } from './beautyApi';

export interface FeedbackRequest {
  messageId: string;
  isPositive: boolean;
  comment?: string;
}

export interface FeedbackResponse {
  result: {
    success: boolean;
    feedback: {
      isPositive: boolean;
      comment?: string;
      timestamp: string;
    };
  };
}

/**
 * Submit feedback for a chat message
 * Routes to the correct API based on theme
 */
export async function submitFeedback(
  request: FeedbackRequest,
  themeName: ThemeName
): Promise<FeedbackResponse> {
  switch (themeName) {
    case 'brownmarket':
      return submitKrupsFeedback(request);
    case 'bluemarket':
      return submitBluemarketFeedback(request);
    case 'brainform':
      return submitBeautyFeedback(request);
    case 'redmarket':
    default:
      // Fallback to mock for themes without real API
      return mockFeedbackResponse(request);
  }
}

// Mock response for themes without real API
function mockFeedbackResponse(request: FeedbackRequest): FeedbackResponse {
  return {
    result: {
      success: true,
      feedback: {
        isPositive: request.isPositive,
        comment: request.comment,
        timestamp: new Date().toISOString(),
      },
    },
  };
}
