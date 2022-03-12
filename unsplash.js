let IntialLoad = true;
class Photos {
  constructor() {
    this.count = 5;
    this.apiKey = "25C_VzsPYaHfR9alBiRKS92GVEYdOjcW-oo-v9X3iKA";
    this.apiUrl = `https://api.unsplash.com/photos/random/?client_id=${this.apiKey}&count=${this.count}`;

    this.photosArray = [];
  }

  async getPhotos() {
    this.photosArray = await fetch(this.apiUrl);
    const data = await this.photosArray.json();
    if (IntialLoad) {
      this.newCount(30);
      IntialLoad = false;
    }
    return data;
  }

  async getSearch(queryName) {
    this.photosArray = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${this.apiKey}&query=${queryName}`
    );
    const dataTwo = await this.photosArray.json();
    return dataTwo;
  }

  newCount(piccount) {
    this.apiUrl = `https://api.unsplash.com/photos/random/?client_id=${this.apiKey}&count=${piccount}`;
  }
}
