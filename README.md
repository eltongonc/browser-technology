# Browser technology

The web is for everybody. This means that anyone with an internet connection can access and edit the web. The web is ubiquitous, the web is messy says Aaron Gustafson. Eventhough being free to access by anyone the web is for everyone, not everyone can experience it in the same way. Some misinterpretations that people have are:
- Everyone has a Mouse or Touchpad.
- Every connection are equally great.
- Computers become faster every time.
- All screens are equally big.
- All humans are the same.


## Progressive enhancement
This week was all about progressive enhancement. Breaking the web was one of the assignment where we chose two of the browser features and disabled it.
Your site might not work if one or more of these features are not present or even outdated :
- Disabled Images.
- Disabled Custom Fonts.
- Disabled Javascript.
- Lack of Colors(colorblindness).
- Slow broadband connection.
- No access to the localStorage
- No permission for Cookies (disabling cookies).
- No mouse or trackpad.

What i wanted to figure out was <b>What would happen if you disabled images and cookies permission for three days<b>.

### First site
After receiving the assignment I went to [Awwwards.com](www.awwwards.com) to browser award wining sites. I soon came across [Protest sportswear](https://www.protest.eu/nl/) which is nominated for site of the year in December 2016. Well lets see some difference:

**Images enabled**
![Protest sportswear](https://eltongonc.github.io/browser-technology/screenshots/protest_imgs.png)

**Images disabled**
![Protest sportswear](https://eltongonc.github.io/browser-technology/screenshots/protest_no-img.png)

**Nothing will be rendered!**

The site waits on sections to be done loading to load another section. I assume it waits until one image is done loading to load another. The home page is a very important page. By having this display as an empty screen you will scare away your viewers.

**Solution: Consider an alternative homepage or remove the fancy onloadsucces images**

### Second site
While type this file I wanted to make a repo to store it in at [Github](github.com), well guess what this file will never be available because

![Github requires cookies](https://eltongonc.github.io/browser-technology/screenshots/github_no-cookies.png)

Gitub uses the cookie to check an user session or store the session of an user. Again this is an assumption.

**Solution: I am not sure if cookies are needed for every login, but give the user a option to save the session**

### Third site
The journey continues.
Well apparently disabling cookies and images is a great combination. My school site does not let me in without cookies and appears as if it was a regular bootstrap site.

![CMD Moodle](https://eltongonc.github.io/browser-technology/screenshots/moodle.png)

These site has no logo or no title to indicate what the site is and who it is for.

**Solution: Set a logo or an alt attribute to your logo so people can tell if it's your site. And also same as the second site, give the user a option to save the session**
