'use strict';

const Service = require('egg').Service;

class GrabService extends Service {

    async Urls() {
        const { ctx } = this;
        const {
            city,
        } = await ctx.service.ip.ip(); // done
        const bendibao = await ctx.service.bendibao.news(city); // done
        ctx.helper.queue(bendibao, async () => {
            return await ctx.service.dbUrlPool.insert({
                url: 'test',
                topic: 'test',
                time: 100,
            })
        });

        const data = await ctx.service.news163.rank(); // done
        const data = await ctx.service.ifeng.ranks(); // done

        const data = await ctx.service.cctv.newest(); // done
        const data = await ctx.service.news163.newest(); // done
        const data = await ctx.service.haiwainet.newest(); // done
        const data = await ctx.service.chinanews.newest(); // todo pagination
        const data = await ctx.service.huanqiu.newest(); // done

        const data = await ctx.service.news163.world(); // done
        const data = await ctx.service.news163.domestic(); // done
        const data = await ctx.service.cctv.world(); // done
        const data = await ctx.service.cctv.domestic(); // done
        const data = await ctx.service.chinanews.world(); // done
        const data = await ctx.service.chinanews.domestic(); // done
    }
}
module.exports = GrabService;
