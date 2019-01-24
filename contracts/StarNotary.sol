pragma solidity ^0.4.24;
import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 { 

    struct Star { 
        string named; 
        string ra;
        string dec;
        uint8 mag;
        uint8 cent;
        string story;
        }
       
       string public constant  NAME =  "ErnestoBM Token";
       string public constant  SYMBOL = "EBM";

        mapping (uint256 => Star) public tokenIdToStarInfo; 
        mapping (uint256 => uint256) public starsForSale;

        function createStar(string _name, string _ra, string _dec, uint8 _mag, uint8 _cent, string _story, uint256 _tokenId) public {
        Star memory newStar = Star(_name, _ra, _dec, _mag, _cent, _story);
        tokenIdToStarInfo[_tokenId] = newStar;
        _mint(msg.sender, _tokenId);
        }

        function getTokenName() public  pure  returns(string ) {
        return NAME;
        }

         function getSymbolName() public  pure returns (string ) {
         return SYMBOL;
        }

  
        function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
            require(ownerOf(_tokenId) == msg.sender);

            starsForSale[_tokenId] = _price;
        }

        function buyStar(uint256 _tokenId) public payable { 
            require(starsForSale[_tokenId] > 0);

            uint256 starCost = starsForSale[_tokenId];
            address starOwner = ownerOf(_tokenId);
            require(msg.value >= starCost);

            _removeTokenFrom(starOwner, _tokenId);
            _addTokenTo(msg.sender, _tokenId);

            starOwner.transfer(starCost);

            if(msg.value > starCost) { 
                msg.sender.transfer(msg.value - starCost);
            }
        }

    /*
    *
    @dev Looks up the stars using the Token ID
    *
    @param uint256 _tokenId 
    *
    @return a name star
    *
    */

    function lookUptokenIdToStarInfo(uint256 _tokenId) public view returns(string) {
        require(ownerOf(_tokenId) == msg.sender);
        string storage nam = tokenIdToStarInfo[_tokenId].named;
        return nam;
    }


    /*
    * @description 2 users can exchange their stars tokens
    * @param _tokenId 
    * @param  _tokenId1
    **
    */
        function exchangeStars(uint256 _tokenId, uint256 _tokenId1) public {
            address owner = ownerOf(_tokenId);
            address owner1 = ownerOf(_tokenId1);
        
        //   _removeTokenFrom(owner, _tokenId);
        //  _removeTokenFrom(owner1, _tokenId1);
        
         transferFrom(owner, owner1, _tokenId);
         transferFrom(owner1, owner, _tokenId1);

        }
    /*
    *@dev Transfer a star from the address of the caller
    *
    **@param uint256 address the address to transfer the star to
    *@param  uint256 _tokenId  token ID of the star
    **
    */
        function transferStar(address addressReceiver, uint256 _tokenId) public  {
        
        address sender = ownerOf(_tokenId);
        // _removeTokenFrom(sender, _tokenId);
          transferFrom(sender, addressReceiver, _tokenId);

        // _addTokenTo(addressReceiver, _tokenId);
        // _removeTokenFrom(sender, addressReceiver, _tokenId);

        }
    }
 