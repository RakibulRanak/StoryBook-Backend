class StoryDto {
    constructor(story) {
        this.id = story.id;
        this.title = story.title;
        this.story = story.story;
        this.author = story.username;
        this.postedAt = story.createdAt;
        return { ...this }

    }
}

module.exports = { StoryDto }