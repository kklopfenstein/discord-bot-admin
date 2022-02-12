
import React from 'react';
import BotManage from '../BotManage';
import mockAxios from 'jest-mock-axios';
import {render, screen, act} from '@testing-library/react';
import '@testing-library/jest-dom'

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

  
  it('displays bot information', async () => {
    const { container } = render(<BotManage/>);

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/bot_manage/1');
    let responseObj = { 
      data: {
        started: true
      }
    };

    act(() => {
      mockAxios.mockResponse(responseObj);
    });

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v1/bot_manage/1');
    let responseObjInfo = { 
      data: {
        id: 1,
        name: 'test bot',
        token: '1234'
      }
    };

    act(() => {
      mockAxios.mockResponse(responseObjInfo);
    });

    screen.getByText('test bot');
    screen.getByText('1234');
    screen.getByText('Started');
  });
});