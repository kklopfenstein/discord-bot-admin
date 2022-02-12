import React from 'react';
import NewBot from '../NewBot';
import {fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer, { act as actRenderer } from 'react-test-renderer';
import mockAxios from 'jest-mock-axios';

jest.mock('react-router-dom', () => ({
  Link: () => {
    const MockName = "mock-name";
    return <MockName />;
  },
  useNavigate: jest.fn()
}));

describe('NewBot', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('displays form', () => {
    let component;
    const bot = {
      name: "",
      token: ""
    }
    actRenderer(() => {
      component = renderer.create(
        <NewBot />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('submits the form posts to api', async () => {
    const bot = {
      name: "",
      token: ""
    };

    const { container } = render(<NewBot bot={bot}/>);

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

    expect(mockAxios.post).toHaveBeenCalledWith('/api/v1/bots', {'bot': {'token': 'OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3z', 'name': 'test'}});
  });
});