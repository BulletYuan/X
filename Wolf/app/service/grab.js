'use strict';

const Service = require('egg').Service;
const Urls = require('../common/urls');

class GrabService extends Service {

    async statis(result) {
        const { ctx } = this;
        let successed = 0;
        return new Promise(res => {
            result.forEach(async (pms, i) => {
                const rs = await pms;
                if (!rs) {
                    ctx.helper.log('failed', i);
                } else {
                    const sus = rs.successed || 0;
                    successed += sus;
                }
                if (i === result.length - 1) {
                    res(successed);
                }
            });
        });
    }
    async datasInsert(datas) {
        const { ctx } = this;
        if (Object.prototype.toString.call(datas).indexOf('Object') >= 0 && datas.data && datas.data.length > 0) {
            return await ctx.helper.queue(datas.data, async (data) => {
                return await ctx.service.dbService.insert(data)
            });
        }
    }

    async Urls() {
        const { ctx } = this;
        ctx.helper.log('GRAB URL BEGIN');
        const {
            city,
        } = await ctx.service.ip.ip(); // done
        const result = [];
        let amount = 0;
        const bendibao = await ctx.service.bendibao.news(city); // done

        const news163Ranks = await ctx.service.news163.ranks(); // done
        const ifentRanks = await ctx.service.ifeng.ranks(); // done

        const cctvNews = await ctx.service.cctv.newest(); // done
        const news163News = await ctx.service.news163.newest(); // done
        const haiwainetNews = await ctx.service.haiwainet.newest(); // done
        const chinanewsNews = await ctx.service.chinanews.newest(); // todo pagination
        const huanqiuNews = await ctx.service.huanqiu.newest(); // done

        const news163World = await ctx.service.news163.world(); // done
        const news163Domestic = await ctx.service.news163.domestic(); // done
        const cctvWorld = await ctx.service.cctv.world(); // done
        const cctvDomestic = await ctx.service.cctv.domestic(); // done
        const chinanewsWorld = await ctx.service.chinanews.world(); // done
        const chinanewsDomestic = await ctx.service.chinanews.domestic(); // done

        amount += ifentRanks.data.length;
        amount += bendibao.data.length;
        amount += news163Ranks.data.length;
        amount += cctvNews.data.length;
        amount += news163News.data.length;
        amount += haiwainetNews.data.length;
        amount += chinanewsNews.data.length;
        amount += huanqiuNews.data.length;
        amount += news163World.data.length;
        amount += news163Domestic.data.length;
        amount += cctvWorld.data.length;
        amount += cctvDomestic.data.length;
        amount += chinanewsWorld.data.length;
        amount += chinanewsDomestic.data.length;

        ctx.helper.log('ifengRanks', ifentRanks.data ? ifentRanks.data.length : 0);
        ctx.helper.log('bendibao', bendibao.data ? bendibao.data.length : 0);
        ctx.helper.log('news163Ranks', news163Ranks.data ? news163Ranks.data.length : 0);
        ctx.helper.log('cctvNews', cctvNews.data ? cctvNews.data.length : 0);
        ctx.helper.log('news163News', news163News.data ? news163News.data.length : 0);
        ctx.helper.log('haiwainetNews', haiwainetNews.data ? haiwainetNews.data.length : 0);
        ctx.helper.log('chinanewsNews', chinanewsNews.data ? chinanewsNews.data.length : 0);
        ctx.helper.log('huanqiuNews', huanqiuNews.data ? huanqiuNews.data.length : 0);
        ctx.helper.log('news163World', news163World.data ? news163World.data.length : news163World);
        ctx.helper.log('news163Domestic', news163Domestic.data ? news163Domestic.data.length : 0);
        ctx.helper.log('cctvWorld', cctvWorld.data ? cctvWorld.data.length : 0);
        ctx.helper.log('cctvDomestic', cctvDomestic.data ? cctvDomestic.data.length : 0);
        ctx.helper.log('chinanewsWorld', chinanewsWorld.data ? chinanewsWorld.data.length : 0);
        ctx.helper.log('chinanewsDomestic', chinanewsDomestic.data ? chinanewsDomestic.data.length : 0);

        result.push(this.datasInsert(bendibao));
        result.push(this.datasInsert(news163Ranks));
        result.push(this.datasInsert(ifentRanks));
        result.push(this.datasInsert(cctvNews));
        result.push(this.datasInsert(news163News));
        result.push(this.datasInsert(haiwainetNews));
        result.push(this.datasInsert(chinanewsNews));
        result.push(this.datasInsert(huanqiuNews));
        result.push(this.datasInsert(news163World));
        result.push(this.datasInsert(news163Domestic));
        result.push(this.datasInsert(cctvWorld));
        result.push(this.datasInsert(cctvDomestic));
        result.push(this.datasInsert(chinanewsWorld));
        result.push(this.datasInsert(chinanewsDomestic));

        const successed = await this.statis(result);
        const data = {
            successed,
            failed: amount - successed
        }
        ctx.helper.log('GRAB URL RESULT', 'amount : ' + amount, 'successed : ' + data.successed, 'failed : ' + data.failed);
        return { data };
    }

    async pageStatis(result) {
        const { ctx } = this;
        let successed = 0;
        const resArr = await Promise.all(result);
        return resArr.reduce((old, cur) => old + Number(cur), 0);
    }
    async pagesInsert(datas) {
        const { ctx } = this;
        if (Object.prototype.toString.call(datas).indexOf('Object') >= 0 && datas.data && datas.data.length > 0) {
            return await ctx.helper.queue(datas.data, async (data) => {
                return await ctx.service.dbService.insert(data)
            });
        }
    }
    async pageAdaptor(url) {
        const { ctx } = this;
        if (url.indexOf(Urls.bendibao.host) >= 0) {
            ctx.helper.log('PAGE Aaptor With:' + Urls.bendibao.host);
            return await ctx.service.bendibao.newsPage(url);
        } else if (url.indexOf(Urls.cctv.host) >= 0) {
            ctx.helper.log('PAGE Aaptor With:' + Urls.cctv.host);
            return await ctx.service.cctv.newsPage(url);
        } else if (url.indexOf(Urls.chinanews.host) >= 0) {
            ctx.helper.log('PAGE Aaptor With:' + Urls.chinanews.host);
            return await ctx.service.chinanews.newsPage(url);
        } else if (url.indexOf(Urls.haiwai.host) >= 0) {
            ctx.helper.log('PAGE Aaptor With:' + Urls.haiwai.host);
            return await ctx.service.haiwai.newsPage(url);
        } else if (url.indexOf(Urls.huanqiu.host) >= 0) {
            ctx.helper.log('PAGE Aaptor With:' + Urls.huanqiu.host);
            return await ctx.service.huanqiu.newsPage(url);
        } else if (url.indexOf(Urls.ifeng.host) >= 0) {
            ctx.helper.log('PAGE Aaptor With:' + Urls.ifeng.host);
            return await ctx.service.ifeng.newsPage(url);
        } else if (url.indexOf(Urls.news163.host) >= 0) {
            ctx.helper.log('PAGE Aaptor With:' + Urls.news163.host);
            return await ctx.service.news163.newsPage(url);
        }
    }
    async Page() {
        const { ctx } = this;
        ctx.helper.log('GRAB PAGE BEGIN');
        const limit = 30;
        const urlField = await ctx.service.dbService.find(
            [
                'id', 'url',
            ], {
                state: 0,
            }, limit);
        let urls = urlField.data;
        if (urls && urls.length === 0) {
            const urlFieldFailure = await ctx.service.dbService.find(
                [
                    'id', 'url',
                ], {
                    state: 2,
                }, limit);
            urls = urlFieldFailure.data;
        }
        if (urls && urls.length > 0) {
            ctx.helper.log('PAGE GRAB From:' + JSON.stringify(urls));
            const amount = urls.length;
            const result = urls.map((fObj, i) => {
                return new Promise(async (res, rej) => {
                    try {
                        const page = await this.pageAdaptor(fObj.url);
                        const data = page.data;
                        if (data && data.content && data.hash) {
                            const fileWrite = await ctx.helper.contentFile(data.hash, page);
                            if (fileWrite) {
                                const updates = await ctx.service.dbService.update({
                                    state: 1,
                                }, {
                                        id: fObj.id
                                    });
                                if (updates.data) {
                                    const createTime = Math.floor(new Date().getTime() / 1000);
                                    const insert = await ctx.service.dbService.insert({
                                        urlId: fObj.id, contentHash: data.hash, createTime
                                    }, 'page_pool');
                                    if (insert.data) {
                                        res(true);
                                    }
                                }
                            } else {
                                await ctx.service.dbService.update({
                                    state: 2,
                                }, {
                                        id: fObj.id
                                    });
                            }
                        } else {
                            await ctx.service.dbService.update({
                                state: 2,
                            }, {
                                    id: fObj.id
                                });
                        }
                    } catch (e) {
                        await ctx.service.dbService.update({
                            state: 2,
                        }, {
                                id: fObj.id
                            });
                        ctx.helper.error('Page Writing ' + fObj.url + ' Error : \n' + e.toString());
                    }
                    res(false);
                });
            });

            const successed = await this.pageStatis(result);
            const data = {
                successed,
                failed: amount - successed
            }
            ctx.helper.log('GRAB PAGE RESULT', 'amount : ' + amount, 'successed : ' + data.successed, 'failed : ' + data.failed);
            return { data };
        } else {
            ctx.helper.log('NO PAGES!');
            return {
                data: {
                    successed: 0,
                    failed: 0
                }
            };
        }
    }
}
module.exports = GrabService;
