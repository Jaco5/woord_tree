import axios from "axios";

export default {
  searchAPI: phrase => axios.get("https://doaj.org/api/v1/search/articles/"+ phrase +"?page=1&pageSize=30")
    
};