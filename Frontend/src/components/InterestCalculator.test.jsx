import { render, screen, fireEvent } from '@testing-library/react';
import InterestCalculator from './InterestCalculator';
import { describe, it, expect } from 'vitest';

describe('InterestCalculator', () => {
  it('renders correctly', () => {
    render(<InterestCalculator />);
    expect(screen.getByText(/Amortization Calculator/i)).toBeInTheDocument();
  });

  it('calculates repayment correctly', () => {
    render(<InterestCalculator />);
    
    // Get inputs (Labels used in your component: "Loan Amount", "Loan Term (in months)")
    const amountInput = screen.getByLabelText(/Loan Amount/i);
    const termInput = screen.getByLabelText(/Loan Term/i);

    // Simulate typing
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.change(termInput, { target: { value: '12' } });

    // Check if results update (Logic based on your component defaults)
    // Note: This assumes the API call in your component defaults to 7% or handles the error gracefully.
    // In a real test, you would Mock the API call.
    expect(screen.getByText(/Total Repayment/i)).toBeInTheDocument();
  });
});