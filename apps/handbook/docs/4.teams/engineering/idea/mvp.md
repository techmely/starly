# MVP Dreams Tree Web

## Why & Values

## Feature Decision

### Guest

- Guest can log-in/sign-up with the social media/basic auth
- Guest can view/like the feed posts
- Guest can share the article
- Guest can s

#### UX

- Guest can toggle Dark/Light mode of website
- Guest can config their font-size of articles with 3 size: Small/Medium/Large
- The article's viewport width default will be N??? - And guest can change their viewport with different size like Small/Medium/Large

### User

- User extend all the feature of Guest
- User can manage the series of articles
- User can manage the articles(Write/Update/Trash/Upload assets)
- User can use AI to make their post/series more smoother 🤔
- User can config the detail article or the series will be display on their way 🤔 - Or System will be apply the default config
-

#### UX

- Rate limit with the IP upload or spam API multiple times

### System

- All the actions will be tracking on the system(might be Google Analytics or SnowPlow)
- Log the CORE WEB VITALS of each user when interacting with website/mobile
- Must design and code on mobile's view port first
- Automatic hide the abusive/toxicity words - No exceptions

#### UX

- System will save the read articles on local storage(might be IndexedDB) browser

### Admin

- Admin can config the header/footer/navigation bar menu
- Admin can band or deactivate the post which was reported
