import React from 'react';
import renderer, { act } from 'react-test-renderer';
import BotsList from '../BotsList';
import mockAxios from 'jest-mock-axios';

jest.mock('react-router-dom', () => ({
  Link: () => {
    const MockName = "mock-name";
    return <MockName />;
  }
}));


afterEach(() => {
  mockAxios.reset();
});

describe('BotList', () => {
  it('displays bots', () => {
    let component;
    act(() => {
      component = renderer.create(
        <BotsList />
      );
    });

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/bots');
    let responseObj = { data: [
      {
        id: 1,
        name: "testbot",
        token: "OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z"
      }
    ]};

    act(() => {
      mockAxios.mockResponse(responseObj);
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays no bots', () => {
    let component;
    act(() => {
      component = renderer.create(
        <BotsList />
      );
    });

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/bots');
    let responseObj = { data: [] };

    act(() => {
      mockAxios.mockResponse(responseObj);
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});