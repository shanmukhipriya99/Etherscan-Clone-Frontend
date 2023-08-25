import moment from 'moment';
import styles from '@/styles/Home.module.css';

export default function SearchResults(props) {
  return (
    <section className={styles.searchResults}>
      {/* <p className={styles.amountOfTransactions}>
        Latest 25 from a total of{' '}
        <span className={styles.blueText}>{props.result.result.length}</span>
        transactions
  </p> */}
      <p className={styles.amountOfTransactions}>
        Total transactions:{' '}
        <span className={styles.blueText}>{props.result.result.length}</span>
      </p>
      <table className={styles.txnSection}>
        <thead>
          <tr className={styles.txnTitle}>
            <th>Transaction Hash</th>
            <th>Method</th>
            <th>Block</th>
            <th className={styles.blueText}>Age</th>
            <th>From</th>
            <th></th>
            <th>To</th>
            <th>Value</th>
            <th className={styles.blueText}>Txn Fee</th>
          </tr>
        </thead>
        {props.result.result.map((txn) => {
          return (
            <tr className={styles.txn}>
              <td className={styles.blueText}>{txn.hash.slice(0, 12)}...</td>
              <td>
                <span className={styles.transfer}>
                  {txn.decoded_call ? txn.decoded_call.label : 'Unknown'}
                </span>
              </td>
              <td className={styles.blueText}>{txn.block_number}</td>
              <td>{moment(txn.block_timestamp, 'YYYYMMDD').fromNow()}</td>
              <td>
                {txn.from_address.slice(0, 6)}...{txn.from_address.slice(36)}
              </td>
              <td>
                <span
                  className={`${
                    txn.from_address.toLowerCase() !==
                    props.result.searchInput.toLowerCase()
                      ? styles.inTxn
                      : styles.outTxn
                  }`}
                >
                  {txn.from_address.toLowerCase() !==
                  props.result.searchInput.toLowerCase()
                    ? 'IN'
                    : 'OUT'}
                </span>
              </td>
              <td className={styles.blueText}>
                {txn.to_address.slice(0, 6)}...{txn.to_address.slice(36)}
              </td>
              <td>{(txn.value / 10 ** 18).toFixed(3)} ETH</td>
              <td>{(txn.gas_price / 10 ** 18).toFixed(10)}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}
