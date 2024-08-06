exports.calculate = (type, args) => {
    switch (type) {
      case 'addition':
        return args.reduce((a, b) => a + b, 0);
      case 'subtraction':
        return args.reduce((a, b) => a - b);
      case 'multiplication':
        return args.reduce((a, b) => a * b, 1);
      case 'division':
        return args.reduce((a, b) => a / b);
      case 'square_root':
        return Math.sqrt(args[0]);
      default:
        throw new Error('Invalid operation type');
    }
  };