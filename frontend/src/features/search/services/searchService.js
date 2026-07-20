import { GUIDES } from '../../../data/mockData';
import { STATES_OPTIONS, LANGUAGES_OPTIONS } from '../constants/filterOptions';

/**
 * Service class for search operations.
 * Isolates data fetching logic preparing it for API integration.
 */
export const searchService = {
  /**
   * Fetches all guides from mock data or future backend API.
   * @returns {Promise<Array>} - Resolves to list of guides
   */
  async fetchGuides() {
    // Simulate API delay for realistic skeleton loading testing
    return new Promise((resolve) => {
      setTimeout(() => {
        // Retrieve guides from localStorage if available (context syncs it there)
        const local = localStorage.getItem('guides');
        resolve(local ? JSON.parse(local) : GUIDES);
      }, 500); // 500ms mock delay
    });
  },

  /**
   * Fetches state choices.
   * @returns {Promise<Array>} - Resolves to list of state filters
   */
  async fetchStates() {
    return Promise.resolve(STATES_OPTIONS);
  },

  /**
   * Fetches language choices.
   * @returns {Promise<Array>} - Resolves to list of languages
   */
  async fetchLanguages() {
    return Promise.resolve(LANGUAGES_OPTIONS);
  }
};
