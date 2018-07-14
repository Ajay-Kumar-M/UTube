import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

function updateState(src){
	if (!src) {
      return;
    }
    this.setState({src})
}

export class MainVid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: "9sWEecNUW-o",
    }
	updateState = updateState.bind(this)
  }

  render() {
    let srcval="https://www.youtube.com/embed/";
	srcval+=this.state.src;
    return (
	<section id="video1">
      <iframe
        title="mainvid1"
        width="560"
        height="315"
        src={srcval}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen/>
	 </section>
    );
  }
}

export class ProcessResult extends Component{
  
  handleClick(thumb,vid,desc,title) {
	  this.props.updateHistoryCB(thumb,vid,desc,title);
	  updateState(vid);
  }
  
  render() {
	  let thumb,title,desc,vid;
	if((this.props.contentType)==="playlist")
	{
	   thumb = this.props.value.snippet.thumbnails.medium.url;
       title = this.props.value.snippet.title;
       desc = this.props.value.snippet.description.substring(0, 100);
       vid = this.props.value.snippet.resourceId.videoId;
	
	   return(
	   <article className="item" data-key="123" onClick={() => this.handleClick(thumb,vid,desc,title)} >
	   <table align="center">
	   <tbody>
	   <tr>
	   <td>
			<img src={thumb} alt="" className="thumb" />
		</td>
		<td>
			<div className="details">
			<h4>{title}</h4>
				<p>{desc}</p>
			</div>
		</td>
		</tr>
		</tbody>
		</table>
		</article>
		);
	}
	else if((this.props.contentType)==="search")
	{
	   thumb = this.props.value.snippet.thumbnails.medium.url;
       title = this.props.value.snippet.title;
       desc = this.props.value.snippet.description.substring(0, 100);
       vid = this.props.value.id.videoId;
	
	   return(
	   <article className="item" data-key="123" onClick={() => this.handleClick(thumb,vid,desc,title)} >
	   <table align="center">
	   <tbody>
	   <tr>
	   <td>
			<img src={thumb} alt="" className="thumb" />
		</td>
		<td>
			<div className="details">
			<h4>{title}</h4>
				<p>{desc}</p>
			</div>
		</td>
		</tr>
		</tbody>
		</table>
		</article>
		);
	}
	else
	{
	   thumb = this.props.value.thumb;
       title = this.props.value.title;
       desc = this.props.value.description;
       vid = this.props.value.videoId;
	
	   return(
	   <article className="item" data-key="123" onClick={() => this.handleClick(thumb,vid,desc,title)} >
	   <table align="center">
	   <tbody>
	   <tr>
	   <td>
			<img src={thumb} alt="" className="thumb" />
		</td>
		<td>
			<div className="details">
			<h4>{title}</h4>
				<p>{desc}</p>
			</div>
		</td>
		</tr>
		</tbody>
		</table>
		</article>
		);
	}
  }
}

export class Result extends Component {

   constructor(props) {
    super(props);
    this.state = {
      responsetxt: null,
	  contentType: null,
	  historyvids: [],
    };
	this.updateHistory = this.updateHistory.bind(this)
  }
	setresponsetxt(data,type){
		this.setState({
		responsetxt: data,
		contentType: type
		});
	}
	
	updateChild(text) {
        updateState(text)
    }

	updateHistory(thumb,vid,desc,title){
		this.setState({
			historyvids: this.state.historyvids.concat([
			{
				thumb: thumb,
				videoId: vid,
				description: desc,
				title: title
			}
			])
	});
	}
	
	componentDidMount(){
    var xhr = new XMLHttpRequest();
	var self = this;
	const key = 'AIzaSyA92F-hXj62UM72v64hREsYsT0s2TBKF0M';
	const playlistId= 'PL2fnLUTsNyq78qZr2WopX7QcGBpxcmzzG';
	const url = 'https://www.googleapis.com/youtube/v3/playlistItems';
	
	xhr.open('GET', url+"?part=snippet&key="+key+"&maxResults=20&playlistId="+playlistId, true);
    xhr.onload = function(e){
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          this.setresponsetxt((JSON.parse(xhr.responseText)),"playlist");
		  this.updateChild(this.state.responsetxt.items[0].snippet.resourceId.videoId);
		} else {
          this.setresponsetxt(xhr.statusText)
        }
      }
    }.bind(this)
	xhr.onerror = function(e){
      console.error(xhr.statusText)
    }
    xhr.send();
		var list = document.querySelector('#videoSearch');
		list.addEventListener('click', function(e){
			e.preventDefault();
			let searchText = document.querySelector('#searchBox').value;
			if((searchText.length)===0)
			{
				alert("Please enter text to search.");
			}
			else
			{
				var xhr1 = new XMLHttpRequest();
				const url1 = 'https://www.googleapis.com/youtube/v3/search';
	
				xhr1.open('GET', url1+"?part=snippet&key="+key+"&maxResults=50&type=video&q="+searchText, true);
				xhr1.onload = function(e){
				if (xhr1.readyState === 4){
					if (xhr1.status === 200){
					self.setresponsetxt((JSON.parse(xhr1.responseText)),"search");
					self.updateChild(self.state.responsetxt.items[0].id.videoId);
					} else {
					self.setresponsetxt(xhr.statusText)
					}
				}
				}
				xhr1.onerror = function(e){
				console.error(xhr1.statusText)
				}
				xhr1.send();
			}
		});
  }
   render() {
	   
	   return(
		<div id="result">
		<table>
		<tbody>
		<tr>
		<td>
		<MainVid />
		{(this.state.responsetxt) ? (this.state.responsetxt.items.map((data,i)=><ProcessResult value={data} key={i} contentType={this.state.contentType} updateHistoryCB={this.updateHistory} />)) : ("noData")
		}
		</td>
		<td className="historyvids">
		<p className="App-intro">
          Recently Played Videos..
		</p>
		{((this.state.historyvids).length) ? (this.state.historyvids.map((data,i)=><ProcessResult value={data} key={i} contentType="history" updateHistoryCB={this.updateHistory} />)) : ("No videos viewed yet! :)")
		}
		</td>
		</tr>
		</tbody>
		</table>
		</div>
   );
}
}

export class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          To get started, Click on a Video to play or Search for videos you want to watch.
		</p>
		<Result />
      </div>
    );
  }
}

export default App;