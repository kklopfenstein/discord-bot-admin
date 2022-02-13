import React from 'react';
import BotResponsesList from '../BotResponsesList';
import mockAxios from 'jest-mock-axios';
import {fireEvent, render, act} from '@testing-library/react';

describe('BotResponsesList', () => {
  it('renders bot responses', () => {
    const botResponses = [
      {
        id: 1,
        response: "test response",
        pattern: "test pattern",
        channel: "#testchannel"
      }
    ];

    const { container } = render(<BotResponsesList botResponses={botResponses} />);

    const responseField = container.querySelector("input[name='response']");
    expect(responseField.value).toEqual('test response');

    const patternField = container.querySelector("input[name='pattern']");
    expect(patternField.value).toEqual('test pattern');

    const channelField = container.querySelector("input[name='channel']");
    expect(channelField.value).toEqual('#testchannel');
  });

  it('submits a new bot response', async () => {
    const { container } = render(<BotResponsesList/>);

    const responseField = container.querySelector("input[name='response']");
    fireEvent.input(responseField, {
      target: {
        value: 'test'
      }
    });

    const patternField = container.querySelector("input[name='pattern']");
    fireEvent.input(patternField, {
      target: {
        value: 'pattern'
      }
    });

    const channelField = container.querySelector("input[name='channel']");
    fireEvent.input(channelField, {
      target: {
        value: '#channel'
      }
    });

    const submitButton = container.querySelector("button");
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(mockAxios.post).toHaveBeenCalledWith('/api/v1/bot_responses', {'bot_response': {'response': 'test', 'pattern': 'pattern', 'channel': '#channel'}});
  });
});