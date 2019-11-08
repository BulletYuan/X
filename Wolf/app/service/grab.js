'use strict';

const Service = require('egg').Service;

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
                return await ctx.service.dbUrlPool.insert(data)
            });
        }
    }

    async Urls() {
        const { ctx } = this;
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

        ctx.helper.log('ifentRanks', ifentRanks.data ? ifentRanks.data.length : 0);
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
        return { data };
    }
}
module.exports = GrabService;
