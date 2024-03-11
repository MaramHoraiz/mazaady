import { fetchMainCategories, fetchSubCategories, fetchProperties } from './api';
import {mainCategories, subCategories} from './mockedData.json';

// Mock Axios
jest.mock('axios');
const axios = require('axios');

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches main categories successfully', async () => {
    const responseData = { mainCategories};
    axios.get.mockResolvedValue({ data: responseData });

    const result = await fetchMainCategories();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith('https://staging.mazaady.com/api/v1/get_all_cats');
  });

  it('fetches sub-categories successfully', async () => {
    const categoryId = 123;
    const responseData = { 

     };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await fetchSubCategories(categoryId);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`https://staging.mazaady.com/api/v1/properties?cat=${categoryId}`);
  });

  it('fetches properties successfully', async () => {
    const subCategoryId = 456;
    const responseData = { subCategories };
    axios.get.mockResolvedValue({ data: responseData });

    const result = await fetchProperties(subCategoryId);

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledWith(`https://staging.mazaady.com/api/v1/get-options-child/${subCategoryId}`);
  });

  it('handles errors when fetching main categories', async () => {
    const errorMessage = 'Error fetching main categories';
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(fetchMainCategories()).rejects.toThrow(errorMessage);
  });

});
