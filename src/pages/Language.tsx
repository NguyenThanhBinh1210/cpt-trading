import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LanguageSheet from '~/components/LanguageSheet'

const Language = () => {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  return (
    <LanguageSheet
      isOpen
      selected={selectedLanguage}
      onClose={() => navigate(-1)}
      onSelect={(code) => {
        setSelectedLanguage(code)
        navigate(-1)
      }}
    />
  )
}

export default Language
