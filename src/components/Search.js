import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'
import { getGistForUser, getPublicGists } from '../services/gistService'
import { useGistInfo } from '../context/gistHook'

function Search() {
  const { changeGist } = useGistInfo();
  // on enter it will consume the api
  const SearchGists = (e) => {
    if (e.key === 'Enter') {
      var gists;
      // if there is no user name defined then fetch all the public gists
      if (e.target.value === '') {
        gists = getPublicGists()
      }
      //else retrieve user specific gists
      else {
        gists = getGistForUser(e.target.value);
      }
      gists.then((res) => {
        changeGist(res.data);
      })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <Wrapper>
      <InputBox>
        <Octicon name="search" />
        <Input placeholder="Search Gists for the username" onKeyPress={(e) => SearchGists(e)} />
      </InputBox>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  padding: 8px;
  background-color: #ffffff;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 6px;
  margin: 0 16px;
`;

const InputBox = styled.div`
  border-radius: 4px;
  display: flex;
  width: 400px;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 16px;

  &:focus{
    outline: 0;
  }
`;

export default Search
