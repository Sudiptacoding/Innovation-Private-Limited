import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Tooltip } from 'react-tooltip'

function SearchData({ allproduct: items }) {
    const navigate = useNavigate()

    const handleOnSearch = (string, results) => {
      
    }

    const handleOnHover = (result) => {
    
    }

    const handleOnSelect = (item) => {
        navigate(`/details/${item.id}`)
    }

    const handleOnFocus = () => {
  
    }


    const formatResult = (item) => {
        return (
            <div className='cursor-pointer'>
                <div >
                    <a data-tooltip-id={item?.id}>{item?.title}</a>
                    <Tooltip id={item?.id} place={'right'}>
                        <div>
                            <img className='w-72 h-36' src={item?.thumbnail} alt="" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <div className='relative lg:w-[450px] md:w-[350px] w-[270px]'>
                    <ReactSearchAutocomplete
                        items={items}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        fuseOptions={{ keys: ["title", "category"] }}
                        resultStringKeyName="title"
                        placeholder='Search your product'
                    />
                </div>
            </header>
        </div>
    )
}

export default SearchData
