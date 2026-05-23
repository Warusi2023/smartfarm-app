# Backend tests

```bash
cd backend
npm test              # all tests
npm run test:unit     # unit only
```

## Week 3 reliability (W3-04)

```bash
npm test -- --testPathPattern="writeIdempotency|offlineWriteQueue"
```

Manual production checklist: [`docs/W3-04_RELIABILITY_QA.md`](../../docs/W3-04_RELIABILITY_QA.md)
