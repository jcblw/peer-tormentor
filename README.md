## Peer Tormentor

This is a plugin to prank your coworkers, and is an iteration on client-tormentor and tormentor that uses [WebRTC](http://www.webrtc.org/). 

### Setup

```shell
npm install
```

Then you will need an account with [Xirsys](http://xirsys.com/) this makes sure you dont expose you coworker's tab information all over the web. Then you'll get some keys from Xirsys for you free singaling servers. Once getting those keys set them in a `config.json` file in the root of your project. Here is an example of what this file should look like.

```json
{
  "ident": "baz",
  "secret": "foo-bar-baz-qux-foo",
  "domain": "foo",
  "room": "bar",
  "application":"foobar"
}
```

### Running

```
npm run build
```

This compiles everything with your keys in the statics code for the Chrome extension and Admin page. 

#### Admin page

Current there is no static server setup to server this information, we currently use [srvdir](https://www.srvdir.net/) for testing PRs are welcome. 

Then navigate to the `/` of the domain and you should see an admin page

> This still at very early stages of development.
