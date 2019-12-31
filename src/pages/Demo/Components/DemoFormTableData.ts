let DataSource: IDemoData[] = [];
for (let i = 0; i < 34; i++) {
  DataSource.push({
    id: i,
    name: `a${i}`,
    age: i,
    createTime: new Date().toUTCString(),
    enable: true,
    diedTime: [new Date().toUTCString(), new Date().toUTCString()],
    sex: 1,
    photo:
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=664782282,1142354879&fm=15&gp=0.jpg',
    photoFile: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url:
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=664782282,1142354879&fm=15&gp=0.jpg',
      },
    ],
    att: [
      {
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
        url: 'http://www.baidu.com/xxx.png',
      },
    ],
    skills: ['杀人', '放火'],
    work: '放火',
    custom: 'aa',
  });
}

export interface IDemoData {
  id: number;
  name: string;
  age?: number;
  createTime: string;
  enable?: boolean;
  sex?: number;
  /**
   * 预计死亡时间
   */
  diedTime?: string[];
  att?: any[];
  /**
   * 工作技能
   */
  skills?: string[];
  work?: string;
  photo?: string;
  photoFile?: any[];
  custom?: string;
}

export default DataSource;
