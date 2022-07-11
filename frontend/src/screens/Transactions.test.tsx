import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {store} from '../app/store';
import Transactions from './Transactions';

jest.mock('react-chartjs-2', () => ({
  Line: () => null
}));

test('renders transactions', async () => {
  const element = render(
    <Provider store={store}>
      <Transactions _id={"62ca11a2d40190a289bdaa20"}/>
    </Provider>
  );

  window.HTMLCanvasElement.prototype.getContext = (): any => {}

  const el = await waitFor(()=> element.getByText(/My Algorand Transactions/i))

  const trxId = element.getAllByText("MRGPNM75JXDM7XXCRVPVJGD5Y5U6SBHSG7DHZTGEV35W2JAI545A")

  expect(el).toBeInTheDocument();
  expect(trxId.length).toBe(2)
});
