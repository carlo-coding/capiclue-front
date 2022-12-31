import { TextField, Tabs, Tab, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react'
import { useGetOptions } from '../../pages/Explore/components/ExploreSidebar/hooks/useGetOptions'
import { useAppDispatch } from '../../app/hooks'
import { setSearch } from './redux/SearchInputSlice'
import { useNavigate } from 'react-router-dom'
import { PublicRoutes } from '../../models'

function ExploreSearchInput(): JSX.Element {
  const options = useGetOptions()

  const dispatch = useAppDispatch()

  const [valueTab, setValueTab] = useState(0)
  const handleChangeTabs = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValueTab(newValue)
  }
  const a11yProps = (
    index: number
  ): {
    id: string
    'aria-controls': string
  } => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    }
  }

  const [valueSearch, setValueSearch] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    if (valueSearch !== '') {
      navigate(`/${PublicRoutes.EXPLORE}?section=search`)
    }
  }, [valueSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValueSearch(e.currentTarget.value)
  }

  const handleClickSearch = (): void => {
    dispatch(setSearch(valueSearch))
  }

  const handleEnterSearch = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    if (event.key === 'Enter') {
      dispatch(setSearch(valueSearch))
    }
  }

  return (
    <>
      <TextField
        sx={{
          maxWidth: '600px',
          margin: '10px'
        }}
        label="Buscar"
        onChange={handleSearchChange}
        onKeyDown={handleEnterSearch}
        value={valueSearch}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClickSearch}>
              <SearchIcon />
            </IconButton>
          )
        }}
      />
      <Tabs
        onChange={handleChangeTabs}
        value={valueTab}
        sx={{
          maxWidth: '100vw',
          display: {
            md: 'none'
          },
          width: '100%',
          '& .MuiTabs-flexContainer': {
            justifyContent: 'space-evenly'
          }
        }}
      >
        {options.map((option, index) => (
          <Tab
            label={option.text}
            onClick={option.onClick}
            key={`mobile-tab-${option.text}`}
            sx={{
              padding: '5px',
              fontSize: '12px'
            }}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
    </>
  )
}
export default ExploreSearchInput
