import { render, screen } from '@testing-library/react-native'
import { ErrorCannotAccess } from '@/components/design-system/error'

describe('ErrorCannotAccess Component', () => {
  test('renders the error message correctly', () => {
    const errorMessage = 'An error occurred'

    render(<ErrorCannotAccess message={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeTruthy()
  })

  test('applies correct styles to error message', () => {
    const errorMessage = 'Something went wrong'

    const { getByText } = render(<ErrorCannotAccess message={errorMessage} />)

    const textElement = getByText(errorMessage)

    expect(textElement.props.style).toMatchObject({ color: 'red' })
  })
})
