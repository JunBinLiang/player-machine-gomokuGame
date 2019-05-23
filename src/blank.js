import React, {Component} from 'react';
import './blank.css'


class blank extends Component
{
	static defaultProps ={
		width : '30px',
		height: '30px',
		
		
	}
	
	constructor(props)
	{
		
		super(props);
		this.clickHandler=this.clickHandler.bind(this);
		this.state=({
			afterClick:false
		});
		this.id=null;
		
	}
	


    clickHandler(evt)  // must be triggered
    {
		
		
		if(this.props.player===2){return;}//you can not click as the machine is playing
		
		
		
		if(this.props.haveClicked||this.props.finish){
			return;
		}
		const val=this.props.position;
		
	   this.setState({haveClicked:true,afterClick:true});
	   this.props.clickChess(this.props.position,this.props.player);  
	}
	
    componentDidUpdate()
    {
		
    
	}

   
  
	render()
	{
		//console.log(this.props.player);
		var playerColor='';
		
		if(this.props.playerColor===1)
		{
			playerColor='blackCircle';
		}
		if(this.props.playerColor===2)
		{
			playerColor='redCircle';
		}
		
		return(
			
			
		     <div className='chess' value={this.props.position}  onClick={this.clickHandler}>
			    
			   <div className={playerColor} >
			
			   </div>
		       
		     </div>
			
			
		);
		
			
			
		
	}
}
export default blank;