function getRemainingTime(targetMs,now=Date.now()) {
  const remaining = targetMs - now

  if (remaining <= 0) {
    return "Time ended";
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (remaining % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (remaining % (1000 * 60)) / 1000
  );

  const parts = [];

  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return parts.join(", ");
}

module.exports = getRemainingTime