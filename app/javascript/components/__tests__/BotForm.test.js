import React from 'react';
import BotForm from '../BotForm';
import {waitFor, fireEvent, render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'
import renderer, { act as actRenderer } from 'react-test-renderer';

describe('BotForm', () => {
  // https://github.com/jsdom/jsdom/issues/1937#issuecomment-810349592
  beforeEach(() => {
    window._virtualConsole.emit = jest.fn();
  });

  it('displays form', () => {
    let component;
    const bot = {
      name: "test",
      token: "testtoken"
    }
    actRenderer(() => {
      component = renderer.create(
        <BotForm bot={bot} />
      );
    });

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('submits the form and invokes callback', async () => {
    const bot = {
      name: "test",
      token: "testtoken"
    };
    const mockOnSubmit = jest.fn();

    const { container } = render(<BotForm bot={bot} onSubmit={mockOnSubmit}/>);

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

    expect(mockOnSubmit.mock.calls.length).toBe(1);
  });
  
  it('does not submit the form and reports invalid token length', async () => {
    const bot = {
      name: "test",
      token: "testtoken"
    };
    const mockOnSubmit = jest.fn();

    const { container } = render(<BotForm bot={bot} onSubmit={mockOnSubmit}/>);

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
        value: 'z'
      }
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit.mock.calls.length).toBe(0);
    screen.getByText('This field must be 59 characters long.');
  });

  it('does not submit the form and reports missing name', async () => {
    const bot = {
      name: "test",
      token: "testtoken"
    };
    const mockOnSubmit = jest.fn();

    const { container } = render(<BotForm bot={bot} onSubmit={mockOnSubmit}/>);

    const name = container.querySelector("input[name='name']");
    const token = container.querySelector("input[name='token']");
    const submitButton = container.querySelector("button");

    fireEvent.input(name, {
      target: {
        value: ''
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

    expect(mockOnSubmit.mock.calls.length).toBe(0);
    screen.getByText('Name is required.');
  });

  it('does not submit the form and reports missing token', async () => {
    const bot = {
      name: "test",
      token: "testtoken"
    };
    const mockOnSubmit = jest.fn();

    const { container } = render(<BotForm bot={bot} onSubmit={mockOnSubmit}/>);

    const name = container.querySelector("input[name='name']");
    const token = container.querySelector("input[name='token']");
    const submitButton = container.querySelector("button");

    fireEvent.input(name, {
      target: {
        value: 'bot name'
      }
    });

    fireEvent.input(token, {
      target: {
        value: ''
      }
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit.mock.calls.length).toBe(0);
    screen.getByText('Token is required.');
  });

  it('does not submit the form and reports that the token is too long', async () => {
    const bot = {
      name: "test",
      token: "testtoken"
    };
    const mockOnSubmit = jest.fn();

    const { container } = render(<BotForm bot={bot} onSubmit={mockOnSubmit}/>);

    const name = container.querySelector("input[name='name']");
    const token = container.querySelector("input[name='token']");
    const submitButton = container.querySelector("button");

    fireEvent.input(name, {
      target: {
        value: 'bot name'
      }
    });

    fireEvent.input(token, {
      target: {
        value: 'OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3zz'
      }
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit.mock.calls.length).toBe(0);
    screen.getByText('This field must be 59 characters long.');
  });

  it('does not submit the form and reports that the token is too short', async () => {
    const bot = {
      name: "test",
      token: "testtoken"
    };
    const mockOnSubmit = jest.fn();

    const { container } = render(<BotForm bot={bot} onSubmit={mockOnSubmit}/>);

    const name = container.querySelector("input[name='name']");
    const token = container.querySelector("input[name='token']");
    const submitButton = container.querySelector("button");

    fireEvent.input(name, {
      target: {
        value: 'bot name'
      }
    });

    fireEvent.input(token, {
      target: {
        value: 'OTM532IwNzgyMDEzNDZhhhgw.Yd6C6Q.Pslx7BdYAlmCsTkJDndWHv8be3'
      }
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit.mock.calls.length).toBe(0);
    screen.getByText('This field must be 59 characters long.');
  });

  it('does not submit the form and reports that the token is invalid', async () => {
    const bot = {
      name: "test",
      token: "testtoken"
    };
    const mockOnSubmit = jest.fn();

    const { container } = render(<BotForm bot={bot} onSubmit={mockOnSubmit}/>);

    const name = container.querySelector("input[name='name']");
    const token = container.querySelector("input[name='token']");
    const submitButton = container.querySelector("button");

    fireEvent.input(name, {
      target: {
        value: 'bot name'
      }
    });

    fireEvent.input(token, {
      target: {
        value: 'OTM532IwNzgyMDEzNDZhhhgw.Yd6C6QkPslx7BdYAlmCsTkJDndWHv8be3z'
      }
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockOnSubmit.mock.calls.length).toBe(0);
    screen.getByText('Must be a valid token.');
  });
});