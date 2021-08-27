import React, { Fragment, useEffect } from 'react';
import { useGistInfo } from '../context/gistHook';
import { getPublicGists as PublicGists } from '../services/gistService'
import Moment from 'react-moment';

//call all the gists by default
function GistList() {
    const { gistInfo, changeGist } = useGistInfo();

    useEffect(() => {
        let gists = PublicGists();
        gists.then((res) => {
            changeGist(res.data);
        })
            .catch((err) => {
                console.log(err);
            })
    }, []);


    return (
        <div className="container">

            {gistInfo?.data.length < 1 ? "No gists available." : (<>
                {gistInfo && gistInfo?.data.map((item, index) => (
                    <div className="row" key={index} style={itemcontent}>
                        <div className="row justify-content-center">
                            <div className="col-sm-2">
                                <img src={item.owner.avatar_url} className="rounded-circle" style={avatarImage} alt={item.owner.login} />
                                <a style={inlineList} href={item.owner.html_url}>{item.owner.login}</a>
                            </div>
                            <div className="col-md-4">
                                <ul className="list-unstyled">
                                    <li className="d-inline" style={inlineList}><a href={item.html_url}>{Object.keys(item.files).length} Files</a></li>
                                    <li className="d-inline" style={inlineList}><a href={item.owner.html_url}>Forks</a></li>
                                    <li className="d-inline" style={inlineList}><a href={item.owner.html_url}>Comments</a></li>
                                    <li className="d-inline" style={inlineList}><a href={item.owner.html_url}>Stars</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li className="d-inline" style={inlineList}>Created at: <Moment format="DD/MM/yyyy">{item.created_at}</Moment></li>
                                    <li className="d-inline" style={inlineList}>Last updated: <Moment format="DD/MM/yyyy">{item.updated_at}</Moment></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <label style={inlineList}>{item.description}</label>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    {Object.keys(item.files).map((fileName, i) => (
                                        <li className="d-inline" style={inlineList} key={i}><a href={item.html_url}>{fileName}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </>
            )}
        </div>
    )
}
const avatarImage = {
    width: "30px",
    height: "30px"
}
const inlineList = {
    padding: "10px"
}
const itemcontent={
    padding:"30px",
    borderBottom:"1px solid #ccc"
}
export default GistList
