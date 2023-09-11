import styled from 'styled-components'
import { Form } from 'react-bulma-components'
import IZButton from '../../Buttons'

export const SearchInput = styled(Form.Input)`
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
`

export const SearchWrapp = styled(Form.Control)`
  display: flex;
`

export const SearchButton = styled(IZButton)`
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
`
