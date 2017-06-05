import express  from 'express';
import  React from 'react';
import {match,RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import getStoreConfig from '../../src/redux/store/store'
import routes from '../../src/routers/routes';
import helper from '../helper';
import {templateName} from '../config';
import RouterMap from '../../src/routermaps';
let router=express.Router();
RouterMap.map((item)=>{
    router.route(item.path).all((req,res)=>{
        match({routes,location:req.originalUrl},(err,redirectLocation,renderPorps)=>{
            if(err){
                res.status(500).end(`Internal Server Error ${err}`);
            }else if(redirectLocation){
                res.redirect(redirectLocation.pathname + redirectLocation.search);
            }else if(renderPorps){
                let store=getStoreConfig();
                // Promise.all([store.dispatch(fetchIndex())]).then(()=>{
                    let html=renderToString(<Provider store={store}><RouterContext {...renderPorps} /></Provider>);
                    let initialState=store.getState();
                    helper.getHTMLFormTemplate(templateName,{
                        body:html,
                        initialState:JSON.stringify(initialState)
                    },(err,page)=>{
                        res.send(page);
                    })
                // })
            }else{
                res.send("404");
            }
        })

    })
})

router.route('/data').all((req,res)=> {
    let data = [{
        "guid": "258944",
        "author": "Izabella Kaminska",
        "title": "Bitcoin and blockchain: the future of money or overhyped? Join the debate",
        "date": "2016-09-13T09:59:36.000Z",
        "body": "<p>Are we facing the next frontier of currency? Like bartering and banknotes before it, blockchain could revolutionise the way we distribute wealth and account for our transactions. A recent <a href=\"http://www.coindesk.com/world-economic-forum-governments-blockchain/\">World Economic Forum survey</a> found that most experts think blockchain, the technology that underpins bitcoin, will become mainstream by 2025. But for every person who thinks blockchain is the future of money, there’s another that thinks it’s all just fantasy hype. We’ll be putting these opinions head-to-head.</p>\r\n<p>The FT is hosting a debate that includes you, our readers, in an integral role. On <b>Wednesday, September 14 at 1pm UK time</b>, Izabella Kaminska of FT Alphaville will face Simon Taylor, co-founder and blockchain director of 11FS. Izabella thinks blockchain and bitcoin are an utter waste of time; Simon believes strongly in the future of crypto-currencies. The debate will be live for one hour, moderated by Carola Hoyos, editor of the FT’s report on accounting.</p>\r\n<p>We want you to join in and help us write the story. Share your questions and opinions in the comments here (under Live Reader Comments), or by emailing <a href=\"mailto:ask@ft.com?Subject=Bitcoin\" target=\"_top\">ask@ft.com</a>, before and through the debate. Together they will form the front page story of the <a href=\"http://www.ft.com/recruitment/accountancy\" target=\"_blank\">FT's report on accountancy</a> to be published on September 22. </p>\r\n<p><i>Here is a <a href=\"http://www.blockchaintechnologies.com/blockchain-glossary\" target=\"_blank\">terminology glossary</a> for reference from Blockchain Technologies.</i></p>\r\n<a href=\"http://blogs.ft.com/tech-blog/liveblogs/2016-09-12/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/Cj4KCLOizVQ\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258935",
        "author": "Tim Bradshaw",
        "title": "Apple iPhone 7 launch – from San Francisco",
        "date": "2016-09-07T15:08:06.000Z",
        "body": "<p>Apple reporters, developers and employees are gathering at San Francisco’s Bill Graham Civic Auditorium for the Cupertino company’s biggest product launch of 2016. </p>\r\n<p>The new iPhone 7 and the first upgrade to the Apple Watch since its debut two years ago are expected, along with new “AirPod” wireless headphones and the latest iOS 10 software. </p>\r\n<p>Apple’s anticipated move to dispense with the standard headphone jack to push consumers towards wireless audio is already causing controversy, so customers and analysts will be eager to hear how chief executive Tim Cook and his deputies explain the change. Another focus is the expected dual-lens camera, which could give the iPhone new optical-zoom or depth-sensing capabilities. </p>\r\n<p><b>Tim Bradshaw</b> and <b>Richard Waters</b> are reporting live from the event and rounding up reaction as it happens, starting at 10am Pacific Time (6pm in London, 1pm in New York). </p>\r\n<a href=\"http://blogs.ft.com/tech-blog/liveblogs/apple-iphone-launch-2016/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/zGV6MKB8zaA\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258926",
        "author": "Martin Arnold",
        "title": "#fintech Sidelining the mobsters in China",
        "date": "2016-08-22T15:09:36.000Z",
        "body": "<p><strong>By Don Weinland</strong></p> <p><strong><em><a href=\"http://nbe.ft.com/nbe/profile.cfm?tech=Y\">Sign up here</a> to receive our daily #techFT email including a fintech focus every Monday.</em></strong></p><a href=\"http://blogs.ft.com/tech-blog/2016/08/sidelining-the-mobsters-in-china/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/wdOxcCxrzkE\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258920",
        "author": "Hannah Kuchler",
        "title": "Hackers expose holes in road for smarter cars",
        "date": "2016-08-19T15:53:45.000Z",
        "body": "<p><strong><em><a href=\"http://nbe.ft.com/nbe/profile.cfm?tech=Y\">Sign up here</a> to receive our daily #techFT email </em></strong></p> <p><img class=\"aligncenter\" src=\"https://ci5.googleusercontent.com/proxy/ejlpiDEt85Lc0iG9acluD8LANtWhnVcRtCEWXGn3BPghlCppzBeS30Rf1OCtgSZKrI9_R59nvfvp1QUMeCXT_DKJ5TIPtfbinV4h_O58eAwE8K4Vm9d2gffhGtkjRt5AjxnQ606B_yCQkfsRseZ0FtiQ6eHaJDx5cMOoY9jYAKVHyh1o4pPe3HRmHJjLO_SPJltS8C-6ks5IAFXv6GikNCaNq6BnFxfxF_qaPqLZMvcc__M8AjhCtl840MbckUXXsc1qZ4ygINKf8q2X0T3v1UuAUh2ZHOeI=s0-d-e1-ft#https://image.webservices.ft.com/v1/images/raw/https%3A%2F%2Femail-platform-ftcom-manual.s3.amazonaws.com%2Fc7d6851d-92c5-417d-9576-c3618e683118?source=ft-email-manual&amp;width=1024&amp;fit=scale-down\" alt=\"car \" width=\"350\" /></p><a href=\"http://blogs.ft.com/tech-blog/2016/08/hackers-expose-holes-in-road-for-smarter-cars/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/M_ZSehsK83I\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258908",
        "author": "Martin Arnold",
        "title": "#fintech: Chinese P2Ps plagued by flaky guarantees",
        "date": "2016-08-03T08:57:36.000Z",
        "body": "<p><strong>By Gabriel Wildau</strong></p> <p><strong><em><a href=\"http://nbe.ft.com/nbe/profile.cfm?tech=Y\">Sign up here</a> to receive our daily #techFT email including a fintech focus every Monday.</em></strong></p><a href=\"http://blogs.ft.com/tech-blog/2016/08/258908/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/7zqcbmqwrP0\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258902",
        "author": "Martin Arnold",
        "title": "#fintech: Transferwise steps up assault on banks",
        "date": "2016-08-02T12:14:20.000Z",
        "body": "<p>Transferwise is best known for its <a href=\"http://click.newsletters.ft.com/f/a/0InQCelFW2O0HkR0gAMXEw~~/AAAAAQA~/RgRZgclWP0EIAOu-xDgOaYRXCGZpbnRpbWVzWAQAAAAASBg1NzllNjlhZjE5ZTBhZjAzMDBkNjQ3ZWVCCgADjkSfVyCRsJBSEmFuZHJldy5qYWNrQGZ0LmNvbQlRBAAAAABEfmh0dHA6Ly9mdGFscGhhdmlsbGUuZnQuY29tLzIwMTYvMDUvMDQvMjE2MDgxNy90cmFuc2Zlcndpc2UtZ2V0cy1zbGFtbWVkLWZvci10aG9zZS1hZHMvP2Z0Y2FtcD1jcm0vZW1haWwvL25iZS9maW50ZWNoRlQvcHJvZHVjdIcLAXsic291cmNlIjoic2ltcGxlLWVtYWlsLXNlcnZpY2UiLCJ0ZW1wbGF0ZUlkIjoiNTc1OTg4YzkwYjg2MGQwMzAwYTJiY2VhIiwicHJvZHVjdCI6IkVtRSIsImJpbmRpbmciOiJlZGl0b3JpYWwiLCJyZXF1ZXN0ZWRTZW5kVGltZSI6IjE0NzAwNTU0OTkiLCJlbWFpbElkIjoiNTc5ZTY5YWYxOWUwYWYwMzAwZDY0N2VlIiwibGlzdElkIjoiNTc1OTgxZWRlNzRlYjkwMzAwYTQ0ZDhlIiwidXNlclV1aWQiOiJhMjhhNzFhOC0yZjI4LTQyYTAtYjRhMy1lODFlZTIyNTBmNTUifQ~~\" target=\"_blank\">aggressive adverts</a> bashing banks for over-charging customers to move money across borders. But even the most radical disruptors are sometimes forced to do a deal with the devil to achieve what they want.</p> <p>So Transferwise had to team up with a traditional lender – in this case <a href=\"http://click.newsletters.ft.com/f/a/-GruvpI2pNMLRJhRVtjnTw~~/AAAAAQA~/RgRZgclWP0EIAOu-xDgOaYRXCGZpbnRpbWVzWAQAAAAASBg1NzllNjlhZjE5ZTBhZjAzMDBkNjQ3ZWVCCgADjkSfVyCRsJBSEmFuZHJldy5qYWNrQGZ0LmNvbQlRBAAAAABERWh0dHBzOi8vd3d3LnJhcGhhZWxzYmFuay5jb20vP2Z0Y2FtcD1jcm0vZW1haWwvL25iZS9maW50ZWNoRlQvcHJvZHVjdIcLAXsiZW1haWxJZCI6IjU3OWU2OWFmMTllMGFmMDMwMGQ2NDdlZSIsInJlcXVlc3RlZFNlbmRUaW1lIjoiMTQ3MDA1NTQ5OSIsInByb2R1Y3QiOiJFbUUiLCJiaW5kaW5nIjoiZWRpdG9yaWFsIiwic291cmNlIjoic2ltcGxlLWVtYWlsLXNlcnZpY2UiLCJ1c2VyVXVpZCI6ImEyOGE3MWE4LTJmMjgtNDJhMC1iNGEzLWU4MWVlMjI1MGY1NSIsInRlbXBsYXRlSWQiOiI1NzU5ODhjOTBiODYwZDAzMDBhMmJjZWEiLCJsaXN0SWQiOiI1NzU5ODFlZGU3NGViOTAzMDBhNDRkOGUifQ~~\" target=\"_blank\">Raphaels Bank</a>, one of the UK’s oldest private banks – to become the first fintech group to gain access to the country’s <a href=\"http://click.newsletters.ft.com/f/a/rBWqz-i0eToNotq3TFIiEg~~/AAAAAQA~/RgRZgclWP0EIAOu-xDgOaYRXCGZpbnRpbWVzWAQAAAAASBg1NzllNjlhZjE5ZTBhZjAzMDBkNjQ3ZWVCCgADjkSfVyCRsJBSEmFuZHJldy5qYWNrQGZ0LmNvbQlRBAAAAABEgmh0dHA6Ly93d3cuYWNjZXNzdG9wYXltZW50c3lzdGVtcy5jby51ay93aGF0LXBheW1lbnQtc2NoZW1lL2Zhc3Rlci1wYXltZW50cy1zY2hlbWUtbGltaXRlZD9mdGNhbXA9Y3JtL2VtYWlsLy9uYmUvZmludGVjaEZUL3Byb2R1Y3SHCwF7InVzZXJVdWlkIjoiYTI4YTcxYTgtMmYyOC00MmEwLWI0YTMtZTgxZWUyMjUwZjU1IiwicHJvZHVjdCI6IkVtRSIsImJpbmRpbmciOiJlZGl0b3JpYWwiLCJzb3VyY2UiOiJzaW1wbGUtZW1haWwtc2VydmljZSIsImVtYWlsSWQiOiI1NzllNjlhZjE5ZTBhZjAzMDBkNjQ3ZWUiLCJsaXN0SWQiOiI1NzU5ODFlZGU3NGViOTAzMDBhNDRkOGUiLCJ0ZW1wbGF0ZUlkIjoiNTc1OTg4YzkwYjg2MGQwMzAwYTJiY2VhIiwicmVxdWVzdGVkU2VuZFRpbWUiOiIxNDcwMDU1NDk5In0~\" target=\"_blank\">Faster Payments Service</a> since the real-time payment system&#8217;s launch in 2008.</p><a href=\"http://blogs.ft.com/tech-blog/2016/08/fintech-transferwise-steps-up-assault-on-banks/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/hyJ8kHg68iw\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258893",
        "author": "Tim Bradshaw",
        "title": "Apple’s third-quarter earnings call – as it happened",
        "date": "2016-07-26T20:50:40.000Z",
        "body": "<p>Apple signaled to Wall Street that the worst of the iPhone decline is behind it, as it reported another slump in smartphone sales on Tuesday.\r\n<p /> The Cupertino-based company has come under pressure to prove that its flagship product can grow again after reporting a 15 per cent drop in iPhones sold in the three months to June. Overall revenues fell 15 per cent to $42.4bn, with net income down 27 per cent to $7.8bn.\r\n<p /> Nonetheless, Luca Maestri, Apple’s chief financial officer, said that iPhone sales fell at a slower rate than they had done in March, which he said had “turned out to be the low point for our cycle”. Apple shares rose 5 per cent after-hours on the more positive outlook.\r\n<p />  Follow Tim Bradshaw and  Richard Waters as they report live reaction to the results and commentary from Tim Cook, Apple chief executive, and Mr Maestri on the conference call with analysts.</p>\r\n<a href=\"http://blogs.ft.com/tech-blog/liveblogs/apple-q316-live/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/QQXStihzVrc\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258880",
        "author": "Chris Nuttall",
        "title": "#techFT – Spotify caught in a rip tide",
        "date": "2016-07-01T14:31:07.000Z",
        "body": "<p>Spotify is angry with Apple, which may be buying Tidal; Nikesh Arora is being investigated by the SEC; the dubious benefits of owning a stake in Zenefits. #techFT is a daily newsletter on technology, media and telecoms. You can sign up <a title=\"techFT\" href=\"http://ft.com/techemail\">here</a>.</p><a href=\"http://blogs.ft.com/tech-blog/2016/07/techft-spotify-caught-in-a-rip-tide/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/se-6uYGchh4\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258865",
        "author": "Martin Arnold",
        "title": "#fintechFT How big a blow is brexit?",
        "date": "2016-06-27T16:53:48.000Z",
        "body": "<p>Last week’s UK referendum has already caused a few wobbles among the country’s financial technology start-ups. Yet the problems created for the UK’s fintech sector by the referendum result could run much deeper. Here are four main reasons why the UK’s aspirations to become a global fintech hub are likely to be hurt by Brexit.</p>\r\n<a href=\"http://blogs.ft.com/tech-blog/2016/06/fintechft-how-big-a-blow-is-brexit/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/YqqnrLSs_xQ\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258856",
        "author": "Chris Nuttall",
        "title": "#techFT – Adland’s days of whines and rosé",
        "date": "2016-06-24T13:21:36.000Z",
        "body": "<p>Google and Facebook are dominating digital advertising, Airbnb has been hit by a French complaint, a look through smartphone lenses. #techFT is a daily newsletter on technology, media and telecoms. You can sign up <a title=\"techFT\" href=\"http://ft.com/techemail\">here</a>.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-adlands-days-of-whines-and-rose/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/C3t8sDRHnIM\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258839",
        "author": "Martin Arnold",
        "title": "#fintechFT – Bank of England catches fintech fever",
        "date": "2016-06-20T15:21:24.000Z",
        "body": "<p>Welcome to the debut of #fintechFT, a regular look every Monday at the latest news, views and comment on digital disruption in financial services.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/fintechft-bank-of-england-catches-fintech-fever/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/6JEbPyn5-b0\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258832",
        "author": "Chris Nuttall",
        "title": "#techFT – New Facebook data aids ad-book",
        "date": "2016-06-17T13:57:40.000Z",
        "body": "<p>Facebook for ad-bookers, Uber making major-market profits, getting the messaging. #techFT is a daily newsletter on technology, media and telecoms. You can sign up here.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-new-facebook-data-aids-ad-book/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/gDQq_yMzMRs\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258827",
        "author": "Chris Nuttall",
        "title": "#techFT – Europe aims to avoid unicorpses",
        "date": "2016-06-16T13:23:51.000Z",
        "body": "<p>Europe has fewer unicorns than the US, but they may be stronger; car-hailing services are picking up lots of cash; Tabcat is good at finding felines. #techFT is a daily newsletter on technology, media and telecoms. You can sign up here.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-europe-aims-to-avoid-unicorpses/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/utjVWxX5y0k\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258821",
        "author": "Chris Nuttall",
        "title": "#techFT – Today at W-IBM-ledon",
        "date": "2016-06-15T15:08:45.000Z",
        "body": "<p>Wimbledon has served its annual tech innovations, Jack Ma thinks fakes are better than the real thing, Twitter has a stake in Soundcloud. #techFT is a daily newsletter on technology, media and telecoms. You can sign up here.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-today-at-w-ibm-ledon/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/0b0gYsd0WtQ\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258816",
        "author": "Chris Nuttall",
        "title": "#techFT – Broken links in Microsoft deals",
        "date": "2016-06-14T14:19:28.000Z",
        "body": "<p>Microsoft&#8217;s biggest acquisition, Apple gets emotional, AI breaks the sound barrier. #techFT is a daily newsletter on technology, media and telecoms. You can sign up here.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-broken-links-in-microsoft-deals/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/2MM-mhLmAVg\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258809",
        "author": "Tim Bradshaw",
        "title": "Hey, Siri: Apple’s WWDC 2016 – as it happened",
        "date": "2016-06-13T16:32:11.000Z",
        "body": "<p>We’ve had Facebook’s F8, Microsoft’s Build and Google I/O. The final event in the spring tech-conference calendar is Apple’s Worldwide Developers conference.</p>\r\n<p>Tim Bradshaw and Richard Waters deliver all the news and live reaction from San Francisco’s Bill Graham Civic Auditorium for as Tim Cook and co take to the stage for WWDC 2016. </p>\r\n<a href=\"http://blogs.ft.com/tech-blog/liveblogs/wwdc-2016/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/uvYZrLytkNo\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258802",
        "author": "Chris Nuttall",
        "title": "#techFT – Microsoft buys LinkedIn, Apple gets Siri-ous on voice",
        "date": "2016-06-13T13:56:20.000Z",
        "body": "<p>The breaking news is that Microsoft has managed to rain on Apple&#8217;s parade for once &#8211; its $26.2bn deal to acquire LinkedIn puts any news from the Worldwide Developers Conference in the shade today. #techFT is a daily newsletter on technology, media and telecoms. You can sign up here.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-microsoft-buys-linkedin-apple-gets-siri-ous-on-voice/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/x_Iec-_zZR0\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258797",
        "author": "Chris Nuttall",
        "title": "#techFT – Sky scores record €4.6bn sports deal",
        "date": "2016-06-10T13:41:15.000Z",
        "body": "<p>As Euro 2016 kicks off, big media sports deals in Europe and China, VC legend Tom Perkins has died, a French blow for Uber. #techFT is a daily newsletter on technology, media and telecoms. You can <a title=\"sign up here \" href=\"http://nbe.ft.com/nbe/profile.cfm?tech=Y\">sign up here</a>.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-sky-scores-record-e4-6bn-sports-deal/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/5KG_0Q3KyO0\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258792",
        "author": "Chris Nuttall",
        "title": "#techFT – Justice’s broad patent put-down",
        "date": "2016-06-09T13:57:14.000Z",
        "body": "<p>The Justice Department has intervened in Apple&#8217;s long-running smartphone patent battle with Samsung, the iPhone maker is changing the economics of its App Store, Google co-founder Larry Page has been investing in a flying car. #techFT is a daily newsletter on technology, media and telecoms. You can <a title=\"sign up here \" href=\"http://nbe.ft.com/nbe/profile.cfm?tech=Y\">sign up here</a>.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-justices-broad-patent-put-down/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/UHfunVvNZRg\" height=\"1\" width=\"1\" alt=\"\"/>"
    }, {
        "guid": "258786",
        "author": "Chris Nuttall",
        "title": "#techFT – The triumph of tech brands",
        "date": "2016-06-08T13:57:47.000Z",
        "body": "<p>Tech, media and technology companies dominate the rankings for the world&#8217;s biggest brands, Amazon is making a big investment in India, while China is taking a stake in Hollywood. #techFT is a daily newsletter on technology, media and telecoms. You can <a title=\"sign up here \" href=\"http://nbe.ft.com/nbe/profile.cfm?tech=Y\">sign up here</a>.</p><a href=\"http://blogs.ft.com/tech-blog/2016/06/techft-the-triumph-of-tech-brands/\" class=\"more-link\">Read more</a><img src=\"http://feeds.feedburner.com/~r/ft/tech-blog/~4/iZvY2RyDZtk\" height=\"1\" width=\"1\" alt=\"\"/>"
    }]
    res.send(data)
});

router.route('/uploadFile').all((req,res)=>{
    let json={pic:'//img13.360buyimg.com/n1/g13/M04/11/0C/rBEhUlLTSwkIAAAAAAGhELKHr2sAAH3BwEuo-wAAaEo805.jpg'}
   res.send(json)
})

export default router;