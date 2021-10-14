const names = ["Oleg", "Alex", "Dan", "Robert", "Artem", "Rick"];
const domains = ["mail.org", "mail.com", "mail.ru", "mail.net", "mail.uk"];
module.exports = () => ({
  groups: Array.from({ length: 10 }, (v, k) => ({
    id: k + 1,
    name: `Group ${k + 1}`,
    comment: "Lovely group",
    createdAt: new Date(2021, 0, k % 28, k % 12),
  })),
  users: Array.from({ length: 100 }, (v, k) => ({
    id: k + 1,
    name: names[k % names.length],
    email: `user${k + 1}@${domains[k % domains.length]}`,
    balance: Math.ceil(Math.random() * 1e4),
    groupId: k % 9 || 1,
    createdAt: new Date(2021, 0, k % 28, k % 4),
  })),
});
