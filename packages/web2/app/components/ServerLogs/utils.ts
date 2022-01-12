type LightLine = {
  raw: string;
  groups: LightGroup[];
};

type LightGroup = {
  name?: string;
  value: string;
};

const NODES = [
  {
    name: 'tag',
    regex: /.+(\[.+\])/gm,
  },
  {
    name: 'classname',
    regex: /((net|org|com)\/.+)(\.class)/gm,
  },
  {
    name: 'org',
    regex: /((net|org|com).+)( |\$?)/gm,
  },
  {
    name: 'url',
    regex: /((http).+)( |)/gm,
  },
  {
    name: 'command',
    regex: /(().+:)/gm,
  },
  {
    name: 'path',
    regex: /(\/.+)( |)/gm,
  },
];

export const prepareLines = (logs: string[]) =>
  logs.reduce((acc: string[], curr: string) => [...acc, ...curr.split('\n')], []);

export const parseLine = (line: string) => {
  const light: LightLine = {
    raw: line,
    groups: [],
  };

  const nodes = NODES.reduce((acc, curr) => {
    const node = acc.raw.match(curr.regex);

    if (node && node[0]) {
      const split = acc.raw.split(node[0]);

      acc.groups.push({
        value: split[0],
      });

      acc.groups.push({
        name: curr.name,
        value: node[0],
      });

      acc.groups.push({
        value: split[1],
      });

      acc.raw = acc.raw.replace(node[0], '');
    }

    return acc;
  }, light);

  if (!nodes.groups.length) {
    nodes.groups.push({
      value: nodes.raw,
    });
  }

  return nodes;
};
