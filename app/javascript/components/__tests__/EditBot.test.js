import React from 'react';
import EditBot from '../EditBot';
import {fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer, { act as actRenderer } from 'react-test-renderer';
import mockAxios from 'jest-mock-axios';

jest.mock('react-router-dom', () => ({
  Link: () => {
    const MockName = "mock-name";
    return <MockName />;
  },
  useNavigate: jest.fn(),
  useParams: () => {
    return {
      botId: 1
    };
  }
}));

describe('EditBot', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('displays form', () => {
    let component;
    
    actRenderer(() => {
      component = renderer.create(
        <EditBot />
      );
    });
    
    expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/bots/1');
    let responseObj = { 
      data: {
        id: 1,
        name: "edited item",
        token: "token"
      }
    };

    actRenderer(() => {
      mockAxios.mockResponse(responseObj);
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('submits the form posts to api', async () => {
    const { container } = render(<EditBot/>);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/bots/1');
    let responseObj = { 
      data: {
        id: 1,
        name: "edited item",
        token: "OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z"
      }
    };

    act(() => {
      mockAxios.mockResponse(responseObj);
    });

    const name = container.querySelector("input[name='name']");
    const token = container.querySelector("input[name='token']");
    const submitButton = container.querySelector("button");

    fireEvent.input(name, {
      target: {
        value: 'test'
      }
    });

    fireEvent.input(token, {
      target: {
        value: 'OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z'
      }
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockAxios.put).toHaveBeenCalledWith('/api/v1/bots/1', {'bot': {'id': 1, 'token': 'OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z', 'name': 'test'}});
  });
});