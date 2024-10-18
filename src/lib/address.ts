export function countPeopleByLocation(teamMembers) {
  const count = {
    Australia: 0,
    Nepal: 0,
    Dubai: 0,
  };

  teamMembers.forEach((member) => {
    const address = member.address.toLowerCase();

    if (
      address.includes("sydney") ||
      address.includes("nsw") ||
      address.includes("australia")
    ) {
      count.Australia++;
    } else if (address.includes("kathmandu") || address.includes("nepal")) {
      count.Nepal++;
    } else if (address.includes("dubai")) {
      count.Dubai++;
    }
  });

  return count;
}
