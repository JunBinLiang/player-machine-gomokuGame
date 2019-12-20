import React, {Component} from 'react';
import Blank from './blank.js';
import './game.css';
class game extends Component
{
	
	static defaultProps ={
		
		boundary:[13,27,41,55,69,83,97,111,125,139,153,167,181,195],
		boundary2:[0,14,28,42,56,70,84,98,112,126,140,154,168,182]
		
	}
	
	
    //x axis  chessIndex%14
    //y  var thRow=Math.floor(chessIndex/14);

	constructor(props)
	{
		
		// player1 : people
		// player2 : machine
		
		super(props);
		this.state=({
			newGame:true,
			player:1,          //start as person
			
			chess:[],         //1 2 3 4 5 6...
			gameState:[],     // 0 0 0 0...
			chessBoard:[],     //Initially : 0 0 0 0...   After: 1 and 2
			click:[],
			FirstTime:true,
			MachineLeading:false,
			machineFirst:200
					});
		this.clickChess=this.clickChess.bind(this);
		this.checkWinner=this.checkWinner.bind(this);
		this.reset=this.reset.bind(this);
		this.machineResponse=this.machineResponse.bind(this);
		this.checkMachineLeading=this.checkMachineLeading.bind(this);
		this.playerHasThreeConnect=this.playerHasThreeConnect.bind(this);
		this.playerHasFour=this.playerHasFour.bind(this);
		this.machineHasThreeConnect=this.machineHasThreeConnect.bind(this);
		this.intervalChecking=this.intervalChecking.bind(this);
		this.playerGeneralThree=this.playerGeneralThree.bind(this);
		this.twoBlankOne=this.twoBlankOne.bind(this);
		this.twoBlankTwo=this.twoBlankTwo.bind(this);
		this.generalLogic=this.generalLogic.bind(this);
	}
	
	
	componentDidMount()  //only call once after the first render
	{
		//console.log("didmount");
		const initialChess=[];
		const initialGameState=[];
		const initialChessBoard=[];
		const initialClick=[];
		for(var i=0;i<196;i++)
		{
			initialGameState.push(0);
			initialChess.push(i);
			initialChessBoard.push(0);
			initialClick.push(false);
			
		}
		this.setState({
			chess:initialChess,
			game:initialGameState,
			chessBoard:initialChessBoard
		})
		
	}
	
	
	clickChess(position,whichPlayer)  //Identify which one is clicked
	{
		//console.log("position ",position);
		var ifIsFirstTime=false;  //after click is triggerd, becomes false
		
		
		var newChessBoard=[...this.state.chessBoard];
		    newChessBoard[position]=whichPlayer;  //the updating player is pass back, pass to component each time
		
		var newClick=[...this.state.click];
		newClick[position]=true;  //array to recodr if is clicked
		if(this.state.player===1)
		{
			//console.log("player1");
			
			this.setState({player:2,chessBoard:newChessBoard,newGame:false,click:newClick});
			 //set State is asyn, use setTimeout to avoid conflict
			 setTimeout(()=>{this.machineResponse(newChessBoard,newClick,position);
							 console.log("player ",this,this.playerHasThreeConnect());},500);  
		}
		
	    if(this.state.player===2)
	   {
		    //console.log("Player2");
			this.setState({player:1,chessBoard:newChessBoard,newGame:false,click:newClick,FirstTime:false});
	   }
	}
	

	
	
	



      machineHasThreeConnect()  // Without block   222      
    {
	  var counter=0;	
	  
	    for(var chessIndex=0;chessIndex<196;chessIndex++)
	  {
			var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
		  
		  counter=0;
		  for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i<=rightBound)&&(this.state.chessBoard[chessIndex+i]===2)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-1>=leftBound)&&(chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===0&&this.state.chessBoard[chessIndex-1]===0&&counter===3)
				  {
					  //console.log("player1",chessIndex);
					  return chessIndex+i;
				  }
			  }
		  }
		  counter=0;
			 for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i*14<196)&&(this.state.chessBoard[chessIndex+i*14]===2)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-14>=0)&&(chessIndex+i*14<196)&&
					 this.state.chessBoard[chessIndex+i*14]===0&&this.state.chessBoard[chessIndex-14]===0&&counter===3)
				  {
					   //console.log("player2",chessIndex);
					  return chessIndex+i*14;
				  }
			  }
		  }
		  counter=0;
		  		  for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===2){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===0&&this.state.chessBoard[chessIndex-15]===0&&
							   (chessIndex-15)<=newthRow*14-1&&(chessIndex-15)>=(thRow-1)*14&&
							   counter===3){ return chessIndex+i*15;}
						}
					}
				}
		  counter=0;
		  		  	for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===2){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===0&&this.state.chessBoard[chessIndex-13]===0&&
							   (chessIndex-13)<=thRow*14-1&&(chessIndex-13)>=(thRow-1)*14&&
							   counter===3){ return chessIndex+i*13;}
						}
					}
				}counter=0;
		  
		  
	  }//big for
    
	  return 200;
	
	} //合格




	
	
	
 
     playerHasThreeConnect()  // Without block   111      
    {
	  var counter=0;	
	  
	    for(var chessIndex=0;chessIndex<196;chessIndex++)
	  {
			var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
		  
		  counter=0;
		  for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i<=rightBound)&&(this.state.chessBoard[chessIndex+i]===1)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-1>=leftBound)&&(chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===0&&this.state.chessBoard[chessIndex-1]===0&&counter===3)
				  {
					  //console.log("player1",chessIndex);
					  return chessIndex+i;
				  }
			  }
		  }
		  counter=0;
			 for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i*14<196)&&(this.state.chessBoard[chessIndex+i*14]===1)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-14>=0)&&(chessIndex+i*14<196)&&
					 this.state.chessBoard[chessIndex+i*14]===0&&this.state.chessBoard[chessIndex-14]===0&&counter===3)
				  {
					   //console.log("player2",chessIndex);
					  return chessIndex+i*14;
				  }
			  }
		  }
		  counter=0;
		  		  for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===1){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===0&&this.state.chessBoard[chessIndex-15]===0&&
							   (chessIndex-15)<=newthRow*14-1&&(chessIndex-15)>=(thRow-1)*14&&
							   counter===3){ return chessIndex+i*15;}
						}
					}
				}
		  counter=0;
		  		  	for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===1){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===0&&this.state.chessBoard[chessIndex-13]===0&&
							   (chessIndex-13)<=thRow*14-1&&(chessIndex-13)>=(thRow-1)*14&&
							   counter===3){ return chessIndex+i*13;}
						}
					}
				}counter=0;
		  
		  
	  }//big for
    
	  return 200;
	}
//合格
	
	
	
	
	

	checkMachineLeading() // 4 possible leading situations  12222  2222           222  1222   machine has four
	{                     // 注意，要连续
		var ifLeading=false;
		var counter=0;
		for(var chessIndex=0;chessIndex<196;chessIndex++)
		{
			//console.log(chessIndex);
			var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
			
			
			for(var i=0;i<5;i++) // 0 1 2 3 4
			{
			   if(i!==4)
			  {
				  
				  if((chessIndex+i<=rightBound)&&(this.state.chessBoard[chessIndex+i]===2)){counter++;}
			  } 
			    if(i===4)
			  {
				  if((chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===0&&counter===4)
				  {
					  //console.log('horizontal ',chessIndex," ",chessIndex+i);
					  console.log(this.state.chessBoard[chessIndex+0],this.state.chessBoard[chessIndex+1],this.state.chessBoard[chessIndex+2],this.state.chessBoard[chessIndex+3],this.state.chessBoard[chessIndex+4]);
					  return chessIndex+i;
				  }
			  }  
			  
				
			}
			counter=0;
			  for(var i=0;i<5;i++) // 0 1 2 3 4
			{
			  if(i!==4)
			  {
				  if((chessIndex-i>=leftBound)&&this.state.chessBoard[chessIndex-i]===2){counter++;}
			  }
			  if(i===4)
			  {
				  if((chessIndex-i>=leftBound)&&this.state.chessBoard[chessIndex-i]===0&&counter===4)
				  {
					  //console.log('horizontal 2');
					  return chessIndex-i;
				  }
			  }  
			  
				
			}//horizontal
			counter=0;
			
			  for(var i=0;i<5;i++) // 0 1 2 3 4  Down
			{
			    if(i!==4)
			  {
				  if((chessIndex+i*14<196)&&this.state.chessBoard[chessIndex+i*14]===2){counter++;}
			  }
			    if(i===4)
			  {
				  if((chessIndex+i*14<196)&&this.state.chessBoard[chessIndex+i*14]===0&&counter===4)
				  {
					  //console.log('return true');
					  return chessIndex+i*14;
				  }
			  }  
			  
				
			}
			counter=0;
						
			  for(var i=0;i<5;i++) // 0 1 2 3 4  Up
			{
			    if(i!==4)
			  {
				  if((chessIndex-i*14>=0)&&this.state.chessBoard[chessIndex-i*14]===2){counter++;}
			  }
			    if(i===4)
			  {
				  if((chessIndex-i*14>=0)&&this.state.chessBoard[chessIndex-i*14]===0&&counter===4)
				  {
					  //console.log('return true');
					  return chessIndex-i*14;
				  }
			  }  
			  
				
			}
			counter=0;
			
				  for(var i=0;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex+i*15]===2){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex+i*15]===0&&counter===4){return chessIndex+i*15;}
						}
					}
				}
			counter=0;
				  for(var i=0;i<5;i++)
				{
					var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex-i*15>=newLeftBound&&chessIndex-i*15<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex-i*15]===2){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex-i*15]===0&&counter===4){return chessIndex-i*15;}
						}
					}
				}
			counter=0;
				  for(var i=0;i<5;i++)
				{
					var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex-i*13>=newLeftBound&&chessIndex-i*13<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex-i*13]===2){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex-i*13]===0&&counter===4){return chessIndex-i*13;}
						}
					}
				}
			counter=0;
			       for(var i=0;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex+i*13]===2){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex+i*13]===0&&counter===4){return chessIndex+i*13;}
						}
					}
				}counter=0;
			
			
		}//big for loop, 196 index
		return 200;
	}
	
	//合格
	
	
	


   playerHasFour() // 4 possible leading situations  12222  2222           222  1222
	{                     // 注意，要连续
		var ifLeading=false;
		var counter=0;
		for(var chessIndex=0;chessIndex<196;chessIndex++)
		{
			//console.log(chessIndex);
			var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
			
			
			for(var i=0;i<5;i++) // 0 1 2 3 4
			{
			   if(i!==4)
			  {
				  
				  if((chessIndex+i<=rightBound)&&(this.state.chessBoard[chessIndex+i]===1)){counter++;}
			  } 
			    if(i===4)
			  {
				  if((chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===0&&counter===4)
				  {
					  //console.log('horizontal ',chessIndex," ",chessIndex+i);
					  //console.log(this.state.chessBoard[chessIndex+0],this.state.chessBoard[chessIndex+1],this.state.chessBoard[chessIndex+2],this.state.chessBoard[chessIndex+3],this.state.chessBoard[chessIndex+4]);
					  return chessIndex+i;
				  }
			  }  
			  
				
			}
			counter=0;
			  for(var i=0;i<5;i++) // 0 1 2 3 4
			{
			  if(i!==4)
			  {
				  if((chessIndex-i>=leftBound)&&this.state.chessBoard[chessIndex-i]===1){counter++;}
			  }
			  if(i===4)
			  {
				  if((chessIndex-i>=leftBound)&&this.state.chessBoard[chessIndex-i]===0&&counter===4)
				  {
					  //console.log('horizontal 2');
					  return chessIndex-i;
				  }
			  }  
			  
				
			}//horizontal
			counter=0;
			
			  for(var i=0;i<5;i++) // 0 1 2 3 4  Down
			{
			    if(i!==4)
			  {
				  if((chessIndex+i*14<196)&&this.state.chessBoard[chessIndex+i*14]===1){counter++;}
			  }
			    if(i===4)
			  {
				  if((chessIndex+i*14<196)&&this.state.chessBoard[chessIndex+i*14]===0&&counter===4)
				  {
					  //console.log('return true');
					  return chessIndex+i*14;
				  }
			  }  
			  
				
			}
			counter=0;
						
			  for(var i=0;i<5;i++) // 0 1 2 3 4  Up
			{
			    if(i!==4)
			  {
				  if((chessIndex-i*14>=0)&&this.state.chessBoard[chessIndex-i*14]===1){counter++;}
			  }
			    if(i===4)
			  {
				  if((chessIndex-i*14>=0)&&this.state.chessBoard[chessIndex-i*14]===0&&counter===4)
				  {
					  //console.log('return true');
					  return chessIndex-i*14;
				  }
			  }  
			  
				
			}
			counter=0;
			
				  for(var i=0;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex+i*15]===1){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex+i*15]===0&&counter===4){return chessIndex+i*15;}
						}
					}
				}
			counter=0;
				  for(var i=0;i<5;i++)
				{
					var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex-i*15>=newLeftBound&&chessIndex-i*15<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex-i*15]===1){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex-i*15]===0&&counter===4){return chessIndex-i*15;}
						}
					}
				}
			counter=0;
				  for(var i=0;i<5;i++)
				{
					var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex-i*13>=newLeftBound&&chessIndex-i*13<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex-i*13]===1){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex-i*13]===0&&counter===4){return chessIndex-i*13;}
						}
					}
				}
			counter=0;
			       for(var i=0;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						if(i!==4)
						{
							if(this.state.chessBoard[chessIndex+i*13]===1){counter++;}
						}
						if(i===4)
						{
							if(this.state.chessBoard[chessIndex+i*13]===0&&counter===4){return chessIndex+i*13;}
						}
					}
				}counter=0;
			
			
		}//big for loop, 196 index
		return 200;
	}
	
	
	
//合格




	intervalChecking(player)   // 111blank1   222blank2      param : player can be 1 or 2
   {
	     var counter=0;
	   for(var chessIndex=0;chessIndex<196;chessIndex++)
	   {
		   	var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
		    var counter=0;
		    //console.log("Inside Interval");
		   counter=0;
		   for(var i=0;i<5;i++)
		   {
			   if((chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===player&&i!==1){counter++;}
			   if(i===1&&chessIndex+i<=rightBound&&this.state.chessBoard[chessIndex+i]===0){counter++;}
			   if(counter===5){return chessIndex+1;}
			    //console.log("Inside Interval1");
		   }
		   counter=0;
		   	for(var i=0;i<5;i++)
		   {
			   if((chessIndex-i>=leftBound)&&this.state.chessBoard[chessIndex-i]===player&&i!==1){counter++;}
			   if(i===1&&chessIndex-i>=leftBound&&this.state.chessBoard[chessIndex-i]===0){counter++;}
			   if(counter===5){return chessIndex-1;}
			   //console.log("Inside Interval2");
		   }
		   counter=0;
		   for(var i=0;i<5;i++)
		   {
			   if(i!==1&&chessIndex+i*14<196&&this.state.chessBoard[chessIndex+i*14]===player){counter++;}
			   if(i===1&&chessIndex+i*14<196&&this.state.chessBoard[chessIndex+i*14]===0){counter++;}
			   if(counter===5){return chessIndex+14;}
			   //console.log("Inside Interval3");
			   
		   }
		   counter=0;
		   	 for(var i=0;i<5;i++)
		   {
			   if(i!==1&&chessIndex-i*14>=0&&this.state.chessBoard[chessIndex-i*14]===player){counter++;}
			   if(i===1&&chessIndex-i*14>=0&&this.state.chessBoard[chessIndex-i*14]===0){counter++;}
			   if(counter===5){return chessIndex-14;}
			   //console.log("Inside Interval4");
		   }
		   counter=0;
		   for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==1&&newthRow>=0&&newthRow<=13&&chessIndex+i*15<=newRightBound&&chessIndex+i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*15]===player){counter++;}
			   	if(i===1&&newthRow>=0&&newthRow<=13&&chessIndex+i*15<=newRightBound&&chessIndex+i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*15]===0){counter++;}
			   if(counter===5){return chessIndex+15;}
			   //console.log("Inside Interval5");
		   }
		   counter=0;
		   
		   		for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==1&&newthRow>=0&&newthRow<=13&&chessIndex-i*15<=newRightBound&&chessIndex-i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*15]===player){counter++;}
			   	if(i===1&&newthRow>=0&&newthRow<=13&&chessIndex-i*15<=newRightBound&&chessIndex-i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*15]===0){counter++;}
			   if(counter===5){return chessIndex-15;}
			   //console.log("Inside Interval6");
			   
		   }counter=0;
		   	 for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==1&&newthRow>=0&&newthRow<=13&&chessIndex+i*13<=newRightBound&&chessIndex+i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*13]===player){counter++;}
			   if(i===1&&newthRow>=0&&newthRow<=13&&chessIndex+i*13<=newRightBound&&chessIndex+i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*13]===0){counter++;}
			   if(counter===5){return chessIndex+13;}
			   //console.log("Inside Interval7");
			   
		   }counter=0;
		   	for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==1&&newthRow>=0&&newthRow<=13&&chessIndex-i*13<=newRightBound&&chessIndex-i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*13]===player){counter++;}
			   	if(i===1&&newthRow>=0&&newthRow<=13&&chessIndex-i*13<=newRightBound&&chessIndex-i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*13]===0){counter++;}
			   if(counter===5){return chessIndex-13;}
			   //console.log("Inside Interval8");
			   
		   }counter=0;
		   
		   
	   }//big for loop
	   return 200;
   }
	
//合格




   twoBlankOne(player) //blank11blank1blank   1 2 4
  {
	  var counter=0;
	  for(var chessIndex=0;chessIndex<196;chessIndex++)
	  {
		    var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
		   counter=0;
		   for(var i=0;i<6;i++)
		   {
			   if((i===0||i===3||i===5)&&chessIndex+i<=rightBound&&this.state.chessBoard[chessIndex+i]===0){counter++;}
			   if(i!==0&&i!==3&&i!==5&&chessIndex+i<=rightBound&&this.state.chessBoard[chessIndex+i]===player){counter++;}
			   if(counter===6){return chessIndex+3;}
		   }
		  counter=0;
		  
		  	 for(var i=0;i<6;i++)
		   {
			   if((i===0||i===3||i===5)&&chessIndex-i>=leftBound&&this.state.chessBoard[chessIndex-i]===0){counter++;}
			   if(i!==0&&i!==3&&i!==5&&chessIndex-i>=leftBound&&this.state.chessBoard[chessIndex-i]===player){counter++;}
			   if(counter===6){return chessIndex-3;}
		   }
		  counter=0;
		  		for(var i=0;i<6;i++)
		   {
			   if((i===0||i===3||i===5)&&chessIndex-i*14>=0&&this.state.chessBoard[chessIndex-i*14]===0){counter++;}
			   if(i!==0&&i!==3&&i!==5&&chessIndex-i*14>=0&&this.state.chessBoard[chessIndex-i*14]===player){counter++;}
			   if(counter===6){return chessIndex-3*14;}
		   }
		  counter=0;
		  	 for(var i=0;i<6;i++)
		   {
			   if((i===0||i===3||i===5)&&chessIndex+i*14<196&&this.state.chessBoard[chessIndex+i*14]===0){counter++;}
			   if(i!==0&&i!==3&&i!==5&&chessIndex+i*14<196&&this.state.chessBoard[chessIndex+i*14]===player){counter++;}
			   if(counter===6){return chessIndex+3*14;}
		   }
		  counter=0;
		    for(var i=0;i<6;i++)
		  {
			   var newthRow=thRow+i;
			   var newLeftBound=newthRow*14;
			   var newRightBound=(newthRow+1)*14-1;
			  if((i===0||i===3||i===5)&&chessIndex+i*15<=newRightBound&&chessIndex+i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*15]===0){counter++;}
			  if(i!==0&&i!==3&&i!==5&&chessIndex+i*15<=newRightBound&&chessIndex+i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*15]===player){counter++;}
			  if(counter===6){return chessIndex+3*15;}
		  }
		  counter=0;
		  
		    for(var i=0;i<6;i++)
		  {
			   var newthRow=thRow-i;
			   var newLeftBound=newthRow*14;
			   var newRightBound=(newthRow+1)*14-1;
			  if((i===0||i===3||i===5)&&chessIndex-i*15<=newRightBound&&chessIndex-i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*15]===0){counter++;}
			  if(i!==0&&i!==3&&i!==5&&chessIndex-i*15<=newRightBound&&chessIndex-i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*15]===player){counter++;}
			  if(counter===6){return chessIndex-3*15;}
		  }
		  counter=0;
		  		    for(var i=0;i<6;i++)
		  {
			   var newthRow=thRow+i;
			   var newLeftBound=newthRow*14;
			   var newRightBound=(newthRow+1)*14-1;
			  if((i===0||i===3||i===5)&&chessIndex+i*13<=newRightBound&&chessIndex+i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*13]===0){counter++;}
			  if(i!==0&&i!==3&&i!==5&&chessIndex+i*13<=newRightBound&&chessIndex+i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*13]===player){counter++;}
			  if(counter===6){return chessIndex+3*13;}
		  }
		  counter=0;
		  	  for(var i=0;i<6;i++)
		  {
			   var newthRow=thRow-i;
			   var newLeftBound=newthRow*14;
			   var newRightBound=(newthRow+1)*14-1;
			  if((i===0||i===3||i===5)&&chessIndex-i*13<=newRightBound&&chessIndex-i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*13]===0){counter++;}
			  if(i!==0&&i!==3&&i!==5&&chessIndex-i*13<=newRightBound&&chessIndex-i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*13]===player){counter++;}
			  if(counter===6){return chessIndex-3*13;}
		  }
		  counter=0;
		  
	  }//big for
	  console.log("false false");
	  return 200;
  }

//合格





   twoBlankTwo(player)  //4
  {
	     var counter=0;
	   for(var chessIndex=0;chessIndex<196;chessIndex++)
	   {
		   	var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
		    
		   
		   counter=0;
		   for(var i=0;i<5;i++)
		   {
			   if((chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===player&&i!==2){counter++;}
			   if(i===2&&chessIndex+i<=rightBound&&this.state.chessBoard[chessIndex+i]===0){counter++;}
			   if(counter===5){return chessIndex+2;}
		   }
		   counter=0;
		   	for(var i=0;i<5;i++)
		   {
			   if((chessIndex-i>=leftBound)&&this.state.chessBoard[chessIndex-i]===player&&i!==2){counter++;}
			   if(i===2&&chessIndex-i>=leftBound&&this.state.chessBoard[chessIndex-i]===0){counter++;}
			   if(counter===5){return chessIndex-2;}
		   }
		   counter=0;
		   for(var i=0;i<5;i++)
		   {
			   if(i!==2&&chessIndex+i*14<196&&this.state.chessBoard[chessIndex+i*14]===player){counter++;}
			   if(i===2&&chessIndex+i*14<196&&this.state.chessBoard[chessIndex+i*14]===0){counter++;}
			   if(counter===5){return chessIndex+28;}
			   
		   }
		   counter=0;
		   	 for(var i=0;i<5;i++)
		   {
			   if(i!==2&&chessIndex-i*14>=0&&this.state.chessBoard[chessIndex-i*14]===player){counter++;}
			   if(i===2&&chessIndex-i*14>=0&&this.state.chessBoard[chessIndex-i*14]===0){counter++;}
			   if(counter===5){return chessIndex-28;}
			   
		   }
		   counter=0;
		   for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==2&&newthRow>=0&&newthRow<=13&&chessIndex+i*15<=newRightBound&&chessIndex+i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*15]===player){counter++;}
			   	if(i===2&&newthRow>=0&&newthRow<=13&&chessIndex+i*15<=newRightBound&&chessIndex+i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*15]===0){counter++;}
			   if(counter===5){return chessIndex+30;}
			   
		   }
		   counter=0;
		   
		   		for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==2&&newthRow>=0&&newthRow<=13&&chessIndex-i*15<=newRightBound&&chessIndex-i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*15]===player){counter++;}
			   	if(i===2&&newthRow>=0&&newthRow<=13&&chessIndex-i*15<=newRightBound&&chessIndex-i*15>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*15]===0){counter++;}
			   if(counter===5){return chessIndex-30;}
			   
		   }counter=0;
		   	 for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==2&&newthRow>=0&&newthRow<=13&&chessIndex+i*13<=newRightBound&&chessIndex+i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*13]===player){counter++;}
			   if(i===2&&newthRow>=0&&newthRow<=13&&chessIndex+i*13<=newRightBound&&chessIndex+i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex+i*13]===0){counter++;}
			   if(counter===5){return chessIndex+26;}
			   
		   }counter=0;
		   	for(var i=0;i<5;i++)
		   {
			        var newthRow=thRow-i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			   if(i!==2&&newthRow>=0&&newthRow<=13&&chessIndex-i*13<=newRightBound&&chessIndex-i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*13]===player){counter++;}
			   	if(i===2&&newthRow>=0&&newthRow<=13&&chessIndex-i*13<=newRightBound&&chessIndex-i*13>=newLeftBound&&
				 this.state.chessBoard[chessIndex-i*13]===0){counter++;}
			   if(counter===5){return chessIndex-26;}
			   
		   }counter=0;
		   
		   
	   }//big for loop
	   //console.log("return 200");
	   return 200;  
  }

//合格



     playerGeneralThree()   //Has block  2111
  {
		var counter=0;	
	    for(var chessIndex=0;chessIndex<196;chessIndex++)
	  {
		 
			var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
		  
		  counter=0;
		  for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i<=rightBound)&&(this.state.chessBoard[chessIndex+i]===1)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-1>=leftBound)&&(chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===0&&this.state.chessBoard[chessIndex-1]===2&&counter===3)
				  {
					  //console.log("player1",chessIndex);
					  return chessIndex+i;
				  }
			  }
		  }
		  counter=0;
		  for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i<=rightBound)&&(this.state.chessBoard[chessIndex+i]===1)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-1>=leftBound)&&(chessIndex+i<=rightBound)&&this.state.chessBoard[chessIndex+i]===2&&this.state.chessBoard[chessIndex-1]===0&&counter===3)
				  {
					  //console.log("player1",chessIndex);
					  return chessIndex-1;
				  }
			  }
		  }
		  counter=0;
		  
			 for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i*14<196)&&(this.state.chessBoard[chessIndex+i*14]===1)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-14>=0)&&(chessIndex+i*14<196)&&
					 this.state.chessBoard[chessIndex+i*14]===0&&this.state.chessBoard[chessIndex-14]===2&&counter===3)
				  {
					   //console.log("player2",chessIndex);
					  return chessIndex+i*14;
				  }
			  }
		  }
		  counter=0;
		  
		  	for(var i=0;i<4;i++)
		  {
			  if(i!==3)
			  {
				  
				  if((chessIndex+i*14<196)&&(this.state.chessBoard[chessIndex+i*14]===1)){counter++;}
			  }
			  if(i===3)
			  {
				  if((chessIndex-14>=0)&&(chessIndex+i*14<196)&&
					 this.state.chessBoard[chessIndex+i*14]===2&&this.state.chessBoard[chessIndex-14]===0&&counter===3)
				  {
					   //console.log("player2",chessIndex);
					  return chessIndex-14;
				  }
			  }
		  }
		  counter=0;
		  		  for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===1){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===2&&this.state.chessBoard[chessIndex-15]===0&&
							   (chessIndex-15)<=newthRow*14-1&&(chessIndex-15)>=(thRow-1)*14&&
							   counter===3){ return chessIndex-15;}
						}
					}
				}
		  
		  		  counter=0;
		  		  for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
			
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===1){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*15]===0&&this.state.chessBoard[chessIndex-15]===2&&
							   (chessIndex-15)<=newthRow*14-1&&(chessIndex-15)>=(thRow-1)*14&&
							   counter===3){ return chessIndex+i*15;}
						}
					}
				}
		  counter=0;
		  		  	for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===1){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===2&&this.state.chessBoard[chessIndex-13]===0&&
							   (chessIndex-13)<=thRow*14-1&&(chessIndex-13)>=(thRow-1)*14&&
							   counter===3){ return chessIndex-13;}
						}
					}
				}counter=0;
		  
		  		  		  	for(var i=0;i<4;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						if(i!==3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===1){counter++;}
						}
						if(i===3)
						{
							if(this.state.chessBoard[chessIndex+i*13]===0&&this.state.chessBoard[chessIndex-13]===2&&
							   (chessIndex-13)<=thRow*14-1&&(chessIndex-13)>=(thRow-1)*14&&
							   counter===3){ return chessIndex+i*13;}
						}
					}
				}counter=0;
		  
		  
		  
	  }//big for
    
	  return 200;
  }	
	//合格
	












   generalLogic(playerPosition)
 {
	 var playerxAxis=playerPosition%14;
	 var playeryAxis=Math.floor(playerPosition/14);
	 
	 //console.log("x ",playerxAxis,"y ",playeryAxis);
	 var X;  var Y;
	 var counter=0;
	 var result;
	     do    {
			       counter++;
			       if(counter===1000)
				   {
					   			 
			           do{
                           result=Math.floor(Math.random() * 196);
                         }   
                         while (this.state.chessBoard[result]!==0);
					   console.log("Break");
					   
					   break;
				   }
			 
                   result=Math.floor(Math.random() * 196);
			       X=result%14;
			       Y=Math.floor(result/14);
			      
               }
         while (this.state.chessBoard[result]!==0||(Math.abs((X-playerxAxis))>=2||Math.abs((Y-playeryAxis))>=2));
	    console.log("x difference ",X-playerxAxis);
	 console.log("y difference ",Y-playeryAxis);
	 //
	 console.log("Result",result);
	 return result;
		
 }



	 
	 
	 
	 
	 
	 
	 

	
	
    machineResponse(newChessBoard,newClick,position)
	{
		//console.log(position);
		var newChessArr=[];
		var newClickArr=[];
		
		if(this.state.FirstTime)
		{
			var startInBoundary1=false;
			for(var i=0;i<this.props.boundary.length;i++){
				//console.log(this.props.boundary[i]);
				if(position===this.props.boundary[i]){startInBoundary1=true;}
			}
			
			var x=Math.floor(Math.random() * 2); // 0 and 1
			
			if(x===0)
			{
				  for(var i=0;i<newChessBoard.length;i++)
		         {
			       newChessArr[i]=newChessBoard[i];
		         }
		          for(var i=0;i<newChessBoard.length;i++)
		         {
			       newClickArr[i]=newClick[i];
		         }
				
				if(startInBoundary1){
					newChessArr[position-1]=2;
				    newClickArr[position-1]=true;
					this.setState({player:1,chessBoard:newChessArr,newGame:false,click:newClickArr,FirstTime:false,machineFirst:position-1});
					
				}else{
					newChessArr[position+1]=2;
				    newClickArr[position+1]=true;
					this.setState({player:1,chessBoard:newChessArr,newGame:false,click:newClickArr,FirstTime:false,machineFirst:position+1});
				}
				
				
		        
				return;
			}
			if(x===1)
			{
				   for(var i=0;i<newChessBoard.length;i++)
		         {
			       newChessArr[i]=newChessBoard[i];
		         }
		          for(var i=0;i<newChessBoard.length;i++)
		         {
			       newClickArr[i]=newClick[i];
		         }
				if(startInBoundary1){
					newChessArr[position-15]=2;
				    newClickArr[position-15]=true;
					this.setState({player:1,chessBoard:newChessArr,newGame:false,click:newClickArr,FirstTime:false,machineFirst:position-15});
					
				}else{
					newChessArr[position+15]=2;
				    newClickArr[position+15]=true;
					this.setState({player:1,chessBoard:newChessArr,newGame:false,click:newClickArr,FirstTime:false,machineFirst:position+15});
				}
			   
				return;
				
			}
			
		}
		// not the first time, regular play
		var counter=0;
		
		
		
		 for(var i=0;i<newChessBoard.length;i++)
		{
			newChessArr[i]=newChessBoard[i];
		}
		 for(var i=0;i<newChessBoard.length;i++)
		{
			newClickArr[i]=newClick[i];
		}
		
		//var x=Math.floor(Math.random() * 10); 
		//newChessArr[x]=2;
		//newClickArr[x]=true;
		
		if(!this.checkWinner())
		{ 
			  var machineGeneralFour=this.checkMachineLeading();
			  var playerThreeConnectNum=this.playerHasThreeConnect();
			  var playerHasFourNum=this.playerHasFour();
			  var machineThreeConnectNum=this.machineHasThreeConnect();
			  var generalThree=this.playerGeneralThree(); //player block 3
			  var playerInterval=this.intervalChecking(1);//player 4
			  var machineInterval=this.intervalChecking(2);//machine 4
			  var machineTwoBlankTwo=this.twoBlankTwo(2);
			  var playerTwoBlankTwo=this.twoBlankTwo(1);
			  var playerTwoBlankOne=this.twoBlankOne(1);
			  var machineTwoBlankOne=this.twoBlankOne(2);
			   //
			  var x;
			  do{
                      x=Math.floor(Math.random() * 24);
                }
                while (this.state.chessBoard[x]!==0);
			
			
			    x=this.generalLogic(position);
			    if(generalThree!==200){x=generalThree;}
			    if(playerThreeConnectNum!==200){x=playerThreeConnectNum;}
			    if(playerTwoBlankOne!==200){x=playerTwoBlankOne;}
			    if(machineThreeConnectNum!==200){x=machineThreeConnectNum;}
			    if(machineTwoBlankOne!==200){x=machineTwoBlankOne;}
			    if(playerHasFourNum!==200){x=playerHasFourNum;}
			    if(playerInterval!==200){x=playerInterval;}
			    if(playerTwoBlankTwo!==200){x=playerTwoBlankTwo;}
			    if(machineInterval!==200){x=machineInterval;}
			    if(machineTwoBlankTwo!==200){x=machineTwoBlankTwo;}
			    if(machineGeneralFour!==200){x=machineGeneralFour;}
			
			
		                      newChessArr[x]=2;
		                      newClickArr[x]=true;
		           
						this.setState({player:1,chessBoard:newChessArr,newGame:false,click:newClickArr,FirstTime:false});
			            //setTimeout(()=>{console.log(this);console.log(this.checkMachineLeading());},200)
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	checkWinner()
	{
		//console.log("Check");
		for(var chessIndex=0;chessIndex<196;chessIndex++)
		{
			var thRow=Math.floor(chessIndex/14);
			var leftBound=thRow*14;
			var rightBound=(thRow+1)*14-1;
			var counter=0;
			if(this.state.chessBoard[chessIndex]!==0)  //first, can not be zero
			{
				
				for(var i=1;i<5;i++)
				{
					if(chessIndex+i<rightBound)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0; //reset the counter for each different kinds of test
				for(var i=1;i<5;i++)
				{
					if(chessIndex-i>leftBound)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex-i]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0;
				for(var i=1;i<5;i++)
				{
					if(chessIndex+i*14<196)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i*14]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0;
				for(var i=1;i<5;i++)
				{
					if(chessIndex-i*14>0)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex-i*14]){counter++;}
						if(counter===4){return true;}
					}
				}
				counter=0;
				
				for(var i=1;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*15>=newLeftBound&&chessIndex+i*15<=newRightBound)
					{
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i*15]){counter++;}
						if(counter===4){ return true;}
					}
				}
				
				
				counter=0;
				
				for(var i=1;i<5;i++)
				{
					var newthRow=thRow+i;
					var newLeftBound=newthRow*14;
			        var newRightBound=(newthRow+1)*14-1;
					
					
					
					if(newthRow>=0&&newthRow<=13&&chessIndex+i*13>=newLeftBound&&chessIndex+i*13<=newRightBound)
					{
						//if(chessIndex===20){console.log(chessIndex+i*13);console.log(this.state.chessBoard[chessIndex+i*13]);}
						if(this.state.chessBoard[chessIndex]===this.state.chessBoard[chessIndex+i*13]){counter++;}
						if(counter===4){return true;}
					}
				}		
				
		     } 
		}
		return false;
		
	}
	
	
	
	
	
	
	
	reset()
	{
		const initialClick=[];
		const initialChess=[];
		const initialGameState=[];
		const initialChessBoard=[];
		for(var i=0;i<196;i++)
		{
			initialGameState.push(0);
			
			initialChess.push
			(i);
			initialChessBoard.push(0);
			initialClick.push(false);
		}
		this.setState({
			newGame:true,
			player:1,
			chess:initialChess,        
			gameState:initialGameState,     
			chessBoard:initialChessBoard,
			click:initialClick,
			FirstTime:true
		});
		
	}
		
	
	
	render()
	{
		//console.log("render");
		var playing='';
		var winner='';
		var finish=this.checkWinner();
		if(finish)
		{
		      if(this.state.player===2)
		      { winner="Player1 Win !!";}
			
			  if(this.state.player===1)
		      { winner="Player2 Win !!";}
		}
		if(!finish)
		{
			playing=<h1 style={{textAlign:'center'}}>Player {this.state.player}</h1>;
		}
		
		//console.log("Render ",finish);
		
	const displayChess=this.state.chess.map((i)=>{
			//console.log("chessBoard",this.state.chessBoard[i]);
			return <Blank 
		                key={i} position={i} clickChess={this.clickChess} player={this.state.player}
			            haveClicked={this.state.click[i]} newGame={this.state.newGame} finish={finish} 
		                machineResponse={this.machineResponse} firstTime={this.state.FirstTime}
		                playerColor={this.state.chessBoard[i]}/>  });
		
		
		
		return(
			
			
		  <div>
		       {playing}
			    <h1 style={{textAlign:'center'}}>{winner}</h1>
			   <div id='allChess'>
			     {displayChess}
			   </div>
				<button onClick={this.reset}>Play Again!</button>   
			    <a href="https://www.linkedin.com/in/junbin-liang-482556176/" style={{textAlign:'center'}}>JunBin+</a>
			    <a href="https://www.linkedin.com/in/jiewen-ying-844815165/" style={{textAlign:'center'}}>JieWen Create</a>
			   
		  </div>	
		);
		
				
	}
		
	
}


export default game;
